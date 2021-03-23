const mongoose = require("mongoose");
const fetch = require("node-fetch");


module.exports = client => {
    
   client.authentificationFetch= async (guild) =>{
        let data = await client.getGuild(guild);
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
                await client.updateGuild(guild, { jwtToken : jwt});
            }) // Cache JWT (for up to 24 hours)
        }
        
    }   
    client.queryFetch = async (query,variables,guild) =>{
        await client.authentificationFetch(guild);
        let g = await client.getGuild(guild);
        return  fetch('https://wax.dfuse.eosnation.io/graphql', {
          method :'POST',
          headers : {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${g.jwtToken.token}`,
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
           console.log('Error happened here!')
           console.error(error)
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

        const account = await client.getAccount(acc);
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

            await client.updateAccount(account.name, { nbWAX : wax});
            await client.updateAccount(account.name, { nbTLM : tlm});
        })
        
    }
    client.accountExist = async (acc,guild) => {

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
        datas.then( async data => {
            if(data.data.accountBalances.edges.length == 0){
                return false
            } 
            else{
                return true
            }
        })
    }
};
