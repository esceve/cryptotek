const mongoose = require("mongoose");
const fetch = require("node-fetch");
const axios = require("axios");
const {Guild, User, Account} = require("../models/index");
const {MessageEmbed} = require("discord.js");
module.exports = client => {
    
   client.authentificationFetch= async (guild) =>{
        let data = await client.getGuild(guild);
        let token = data.jwtToken;
        const date = Math.floor((Date.now())/1000);
        if(token == "MongooseDocument { null }" || token.expires_at <= date - 86400){
            console.log("je suis ici")
            var newToken = await fetch("https://auth.eosnation.io/v1/auth/issue", {
                method: "POST",
                body: JSON.stringify({
                api_key: process.env.APIKEY
                }),
                headers: {
                "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then( async jwt => {
                return jwt
            })
            await client.updateGuild(guild, { jwtToken : newToken});
            return newToken.token; // Cache JWT (for up to 24 hours)
        }
        return token.token;
   }
    client.queryFetch = async (query,variables,guild) =>{
        var token = await client.authentificationFetch(guild);
        return  fetch('https://wax.dfuse.eosnation.io/graphql', {
          method :'POST',
          headers : {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`,
              'Accept': 'application/json'
            },
          body : JSON.stringify({
              query : query,
              variables : variables
          })
      })
      .then(async response => {
          try {
           const data = await response.json();
           return data;
         } catch(error) {
           //console.log('Error happened here!')
           //console.error(error)
         }
        })
      
    }

    client.updateBalance = async (acc,guild) => {
        const datas = client.queryFetch(
            `
            query($account: String!, $limit: Uint32, $opts: [ACCOUNT_BALANCE_OPTION!]) {
                accountBalances(account: $account,limit: $limit, options: $opts) {
                    blockRef {
                        id
                        number
                    }
                    edges {
                        node {
                            account
                            symbol
                            balance
                        }
                    }
                }
            }
            `,
            {
                "account": acc,
                "opts": [
                    "EOS_INCLUDE_STAKED"
                ],
                "limit": 10
            },guild
            );
            await client.getAccount(acc)
            let wax = 0;
            let tlm = 0;
            datas.then( async data => {
                for(const node of data.data.accountBalances.edges){
                    switch(node.node.symbol){
                        case "WAX" :
                            wax = node.node.balance;
                            break;
                            case "TLM" : 
                            tlm = node.node.balance;
                            break;
                            default:
                                break;
                    }
                }
            await client.updateAccount(acc, { nbWAX : wax});
            await client.updateAccount(acc, { nbTLM : tlm});
            })
    }

    client.accountExist = async (acc,guild) => {

        const datas = await client.queryFetch(
            `
            query($account: String!, $limit: Uint32, $opts: [ACCOUNT_BALANCE_OPTION!]) {
                accountBalances(account: $account,limit: $limit, options: $opts) {
                blockRef {
                    id
                    number
                }
                edges {
                    node {
                    account
                    symbol
                    balance
                    }
                }
                }
            }
            `,
            {
                "account": acc,
                "opts": [
                "EOS_INCLUDE_STAKED"
                ],
                "limit": 10
            },guild
        );
        let exist = false;
        if(datas.data.accountBalances.edges.length == 0){
            exist = false;
        } 
        else{
            exist = true;
        }
        return exist;

    }
    client.tlmPrice = async () => {
        return await axios
        .get("https://wax.alcor.exchange/api/markets")
            .then(res => {
                var currencies = res.data
                var tlmCurrencies = 0;
                for (item in currencies) {
                    if(currencies[item].id == undefined) continue;
                    if (currencies[item].id == 26) {
                        tlmCurrencies = currencies[item].last_price;
                    }
                }
            return tlmCurrencies;
         }
        )
    }
    
    client.waxPrice = async () => {
        return await axios
        .get("https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=EUR")
        .then(res => {
                return res.data.wax.eur
         }
        )
    }

    client.isShitListed = async accName => {
        
        let url = `https://wax.eosusa.news/v2/history/get_actions?account=${accName}&limit=1&skip=0&filter=*:transfer&transfer.to=${accName}`
        await fetch(url)
            .then(res => res.json())
            .then(async json => {
                if(!json.actions[0]) return;
                    let data = json.actions[0].act.data;
                    if (data.memo == "ALIEN WORLDS - Mined Trilium"){
                        if(parseFloat(data.quantity.split(' ')[0]) <= 0.00999){
                            await client.updateAccount(accName, { isShitListed : true});
                        }
                    }
            })
        
      }
      client.getLastNFT = async accName=>{

        let url = `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${accName}&page=1&limit=1&order=desc&sort=minted`
        
        const thenft = await fetch(url)
            .then(res => res.json())
            .then(async json => {
                if (!json.data.length) return;
       
                const data = json.data[0].data;
                const timeNFT = Math.floor((json.data[0].minted_at_time)/1000);
                const date = Math.floor((Date.now())/1000);
                if ( (timeNFT > date - 420)) { //Tout est en secondes
                    const price = await client.getNFTPrice(json.data[0].asset_id)
                    let nft = {
                        id: json.data[0].asset_id,
                        created_at_time: timeNFT,
                        name: data.name,
                        rarity: data.rarity,
                        img: `https://cloudflare-ipfs.com/ipfs/${data.img}`,
                        avg_price: `${price.avg_eur} EUR`,
                        last_sold_eur: `${price.last_sold_eur} EUR`,
                        username : accName
                    }
                    return nft;
                }
        })
        return thenft;
      }
      client.getNFTPrice = async nftid => {
        let url = `https://www.nfthive.io/api/price-info/${nftid}`
        const price = await fetch(url)
            .then(res => res.json())
            .then(async json => {
                let waxeur = await client.waxPrice();
                let prices = {
                    avg_eur : parseFloat(json.average)*waxeur,
                    last_sold_eur : parseFloat(json.last_sold_usd)
                }
                return prices
            })
        return price;
      }
      client.showLastNFTs = async () =>{
          const users = await User.find({});  
          for(const user in users){
            let userNFTs = []
            for(const accName of users[user].accounts){
                console.log(accName)
                const nft = await client.getLastNFT(accName)
                if(nft === undefined) continue;
                else userNFTs.push(nft)
            }
            if(userNFTs.length){
                let member = await client.guilds.fetch(`${users[user].guildID}`)
                    .then(guild => guild.members.fetch(`${users[user].userID}`))
                let discordUser = member.user;
                for(const nft of userNFTs){
                    let date = new Date(nft.created_at_time * 1000)
                    let embed = new MessageEmbed()
                        .setAuthor(`${discordUser.username}`, `${discordUser.displayAvatarURL()}`)
                        .setTitle(nft.name)
                        .setImage(nft.img)
                        .setTimestamp(nft.created_at_time)
                        .addField(`Prix : `, `Vendu en moyenne : ${nft.avg_price}\nDernier vendu à : ${nft.last_sold_eur}`)
                        .addField(`Date: `, `NFT drop le : ${date}`)
                        .addField('Par : ', `${discordUser.username} avec le compte ${nft.username}`)
                    
                    switch (nft.rarity) {
                        case 'Abundant':
                            break;
                        case 'Common':
                            embed
                                .setColor("#222222")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;   
                        case 'Rare':
                            embed
                                .setColor("#3998d8")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;
                        case 'Epic':
                            embed
                                .setColor("#6d247d")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;

                        case 'Legendary':
                            embed
                                .setColor("#b47c00")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;

                        case 'Mythical':
                            embed
                                .setColor("#bd2b2b")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;
                        default:
                            embed
                                .setColor("#396847")
                            client.channels.cache.get('824559024720183296').send(embed);
                            client.users.cache.get(users[user].userID).send(embed);
                            break;
                    }
                }
                
            }
            
          }
      }
      client.updateAllBalances = async () =>{
        const users = await User.find({}); 
        for(const user in users){
            const guild = await client.guilds.fetch(`${users[user].guildID}`);
            console.log(`${users[user].username}`)
            for(const accName of users[user].accounts){
                await client.updateBalance(accName,guild)
            }
        }
    }
        client.updateShitlist = async () =>{
            const users = await User.find({});  
            for(const user in users){
                const userAccounts = []
                console.log(`${users[user].username}`)
                for(const accName of users[user].accounts){
                    await client.getAccount(accName)
                    await client.isShitListed(accName)
                    const acc = await client.getAccount(accName)
                    console.log(`${acc.name} est shitlisté : ${acc.isShitListed}`)
                    if (acc.isShitListed) {
                        userAccounts.push(acc.name)
                                                 
                    }
                }
                if(userAccounts.length == 0) continue;
                let member = await client.guilds.fetch(`${users[user].guildID}`)
                        .then(guild => guild.members.fetch(`${users[user].userID}`))
                let discordUser = member.user;
                let embed = new MessageEmbed()
                        .setAuthor(`${discordUser.username}`, `${discordUser.displayAvatarURL()}`)
                        .setTitle(':warning: Vos comptes ont été shitlistés :warning:')
                        .setDescription('Veuillez supprimer ces comptes de la base de données pour ne pas recevoir ce message de nouveau')
                        .setTimestamp()
                for(const userAcc of userAccounts){
                    embed
                        .addField(`${userAcc} : `, `:x:`)
                }
                client.users.cache.get(`${users[user].userID}`).send(embed);
                client.channels.cache.get('824559024720183296').send(embed);
                
                
            }
        }

        client.dontMint = async (accName) =>{
            let url = `https://wax.eosusa.news/v2/history/get_actions?account=${accName}&limit=1&skip=0&filter=*:transfer&transfer.to=${accName}`
            if (await fetch(url)
            .then(res => res.json())
            .then(async json => {
                if(!json.actions[0]) return;
                    let data = json.actions[0].act.data;
                    let temps = json.actions[0].timestamp;
                    let annee = temps.slice(0,4)
                    let mois = temps.slice(5,7)
                    let jour = temps.slice(8,10)
                    let heure = temps.slice(11,13)
                    let minutes = temps.slice(14,16)
                    let secondes = temps.slice(17,19)
                    let ms = temps.slice(20)
                    const datenow = Date.now()
                    const date = new Date();
                    date.setHours(parseInt(heure),parseInt(minutes),parseInt(secondes),parseInt(ms))
                    date.setFullYear(annee,mois -1 ,jour)                 
                    if (data.memo == "ALIEN WORLDS - Mined Trilium"){
                        if (date.getTime() < datenow - 7200000){
                            return true;
                        }else return false;
                    }
            })) return true
            else return false
        }
        client.updateDontMint = async () =>{
            const users = await User.find({});  
            for(const user in users){
                let userAccounts = []
                console.log(`${users[user].username}`)
                for(const accName of users[user].accounts){
                    
                    let isDontMint = await client.dontMint(accName)
                    const acc = await client.getAccount(accName)
                    console.log(`${acc.name} ne mine plus : ${isDontMint}`)
                    if (isDontMint) {
                        userAccounts.push(acc.name)                        
                    }
                }

                if(userAccounts.length == 0) continue;
                    let member = await client.guilds.fetch(`${users[user].guildID}`)
                            .then(guild => guild.members.fetch(`${users[user].userID}`))
                    let discordUser = member.user;
                    let embed = new MessageEmbed()
                            .setAuthor(`${discordUser.username}`, `${discordUser.displayAvatarURL()}`)
                            .setTitle(":rotating_light:  Vos comptes ne minent plus depuis plus de 2 heures :rotating_light: ")
                            .setDescription('Veuillez vérifier que les comptes ci-dessous sont toujours entrain de miner')
                            .setTimestamp()
                    for(const userAcc of userAccounts){
                        embed
                            .addField(`${userAcc} : `, `:watch:`)
                    }
                    client.users.cache.get(`${users[user].userID}`).send(embed);
                    client.channels.cache.get('824559024720183296').send(embed);
                
            }
        }

};
