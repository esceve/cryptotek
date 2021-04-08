const mongoose = require("mongoose");
const axios = require("axios");
const { Guild, User, Account, API } = require("../models/index");
const express = require('express');
const router = new express.Router();

router.get('/total', async (req, res) => {
    let nbWax = 0;
    let nbTlm = 0;
    console.log(req.query.username)
    let user = await User.findOne({username : req.query.username});
    for(const accName of user.accounts){
        let acc = await Account.findOne({name: accName});
        nbWax += parseFloat(acc.nbWAX);
        nbTlm += parseFloat(acc.nbTLM);
    }
    let nbWaxEUR = await getWaxPrice();
    let nbTlmEUR = await getTlmPrice();
    var tlmToWax = nbTlm * nbTlmEUR;
    var totalWax = tlmToWax + nbWax;
    var WaxToEur = totalWax * nbWaxEUR;
    let total = {
        WaxToEur,
        nbWax,
        nbTlm
    }
   res.status(200).send({total: total});
});

router.get('/shitlist', async (req, res) => {
    const user = await User.findOne({username : req.query.username});  
    let userAccounts = []
    for(const accName of user.accounts){
        let acc = await Account.findOne({name: accName});
        if (acc.isShitListed) {
            userAccounts.push(acc.name)                                     
        }
    }
   res.status(200).send({shitlist : userAccounts});
});

router.get('/usernames', async (req, res) => {
        let users = await User.find({});
        let usernames = [];
        for(const user in users){
                usernames.push(users[user].username);
        }
        res.status(200).send({usernames: usernames});
});

router.get('/accounts', async (req, res) => {
        let accounts = await Account.find({username: req.query.username})
        if(accounts) res.status(200).send({accounts: accounts});
        else res.status(404).send({accounts: undefined});
});

router.get('/account', async (req, res) => {
    let account = await Account.findOne({name: req.query.name})
    if(account) res.status(200).send({account: account});
    else res.status(404).send({account: undefined});
    
});

router.get('/price', async (req, res) => {
    let tlmPrice = await getTlmPrice();
    let WaxPrice = await getWaxPrice();

    res.status(200).send({ data: { tlmToWaxPrice: tlmPrice, WaxToEurPrice: WaxPrice } });
})

router.get('/mkacc', async (req, res) => {
        let accountisExisting = await accountExist(req.query.name)
        if(!accountisExisting){
                res.status(404).send({message: "Account Doesn't exist."});
        }else {
            let account = {
                    name : req.query.name,
                    username : req.query.username
            }
            const merged = Object.assign({ _id : mongoose.Types.ObjectId()},
            account);   
            const createAccount = new Account(merged);
            createAccount.save().then(acc =>console.log(`Nouveau Compte -> ${acc.name}`));
    
            res.status(200).send({message: "Account added successfully"});
        }
})

router.get('/rmacc', async (req, res) => {
        let data = await Account.findOne({name: req.query.name})
        if(!data){
                res.status(404).send({message: "Le compte n'existe pas ou a déjà été supprimé de la base de données."});
        }else {
                let dbUser = await User.findOne({ username : req.query.username});
                let acc = dbUser.accounts;
                acc.splice(acc.indexOf(req.query.name),1);
                await updateUser(dbUser, {accounts: acc});
                res.status(200).send({message: `Le compte ${req.query.name} a bien été supprimé.`});
                data.deleteOne();
                
        }
       
})

router.get('/leaderboard', async (req, res) => {
    let users = await User.find({});
    let usersLeadboard = [];
    var leaderboard = [];
    var nbWaxEUR = await waxPrice();
    var nbTlmEUR = await tlmPrice();
    for (const user in users) {
        let nbWax = 0;
        let nbTlm = 0;
        for(const accName of users[user].accounts){
            let acc = await Account.findOne({name: accName});
            nbWax += parseFloat(acc.nbWAX);
            nbTlm += parseFloat(acc.nbTLM);
        }
        var tlmToWax = nbTlm * nbTlmEUR;
        var totalWax = tlmToWax + nbWax;
        var WaxToEur = totalWax * nbWaxEUR;
        if (users[user].accounts.length > 0 ) {
            usersLeadboard.push({
                username: users[user].username,
                nbrAccount: users[user].accounts.length,
                wax: nbWax,
                tlm: nbTlm,
                eur: WaxToEur
            })
        }
    }
    usersLeadboard.sort(function (a, b) {
        if ( a.eur < b.eur ){
            return 1;
        }
        if ( a.eur > b.eur ){
            return -1;
        }
        return 0
    })
    var i = 0;
    for (const user in usersLeadboard) {
        leaderboard.push({
            username : usersLeadboard[user].username,
            wax : usersLeadboard[user].wax.toFixed(2),
            tlm : usersLeadboard[user].tlm.toFixed(2),
            eur : usersLeadboard[user].eur.toFixed(2),
            nbrAccount : usersLeadboard[user].nbrAccount
        })
            i++;
    }
    console.log(leaderboard)
    if(leaderboard)  res.status(200).send({leaderboard: leaderboard});
    else res.status(404).send({message: "Probleme avec leaderboard"});
   
})



const getTlmPrice = async () => {
        return axios
            .get("https://wax.alcor.exchange/api/markets")
                .then(res => {
                    var currencies = res.data
                    var tlmCurrencies = 0;
                    for (item in currencies) {
                        if (currencies[item].id == 26) {
                            tlmCurrencies = currencies[item].last_price;
                        }
                    }
                return tlmCurrencies;
             }
            )
    }
    
    const getWaxPrice = async () => {
        return axios
            .get("https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=EUR")
                .then(res => {
                    return res.data.wax.eur
             }
            )
    }
    

    
    const updateUser = async (user,settings) => {
        let data = user;
        if (typeof data !== "object") data ={};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };
      const updateAPI = async (api,settings) => {
        let data = api;
        if (typeof data !== "object") data ={};
        for (const key in settings){
                if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
        };
    
    const authentificationFetch= async () =>{
            let data = await API.find({});
            let token = data.jwtToken;
            if(token == null || token.expired_at <= Date.now()){
                fetch("https://auth.eosnation.io/v1/auth/issue", {
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
                    await updateAPI(data, { jwtToken : jwt});
                }) // Cache JWT (for up to 24 hours)
            }
            
        }   
    const queryFetch = async (query,variables,api) =>{
            await authentificationFetch(api);
            return  fetch('https://wax.dfuse.eosnation.io/graphql', {
              method :'POST',
              headers : {
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${api.jwtToken.token}`,
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
    
    const accountExist = async (acc) => {
            let api = await API.find({})
            const datas = await queryFetch(
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
                },api
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
    
        const tlmPrice = async () => {
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
        
        const waxPrice = async () => {
            return await axios
            .get("https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=EUR")
            .then(res => {
                    return res.data.wax.eur
             }
            )
        }
// GET USERNAME

// get account by username

//refresh account -> TLM / WAX / SHITLIST

module.exports = router;