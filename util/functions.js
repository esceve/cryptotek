const mongoose = require("mongoose");
const {Guild, User, Account} = require("../models/index");

module.exports =  client => {
    //GUILD
    client.createGuild = async guild => {
        const merged = Object.assign({ _id : mongoose.Types.ObjectId()},
        guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g =>console.log(`Nouveau serveur -> ${g.guildName}`));
    };
   client.getGuild = async guild => {
       const data = await Guild.findOne({ guildID : guild.id});
       if(data) return data;
       return client.config.DEFAULTSETTINGS;
   };
   client.updateGuild = async (guild,settings) => {
       let data = await client.getGuild(guild);
       if (typeof data !== "object") data ={};
       for (const key in settings){
           if(data[key] !== settings[key]) data[key] = settings[key];
       }
       return data.updateOne(settings);
   };

   //                                                                                                                     //
   //USER
   client.createUser = async user => {
        const merged = Object.assign({ _id : mongoose.Types.ObjectId()},
        user);
        const createUser = await new User(merged);
        createUser.save().then(u =>console.log(`Nouveau utilisateur -> ${u.username}`));
    };

    client.getUser = async user => {
        const data = await User.findOne({ userID : user.id});
        if(data) return data;
        else return;
    };

    client.updateUser = async (user,settings) => {
        let data = await client.getUser(user);
        if (typeof data !== "object") data ={};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    //ACCOUNT
    client.createAccount = async account => {
        const merged = Object.assign({ _id : mongoose.Types.ObjectId()},
        account);
        const createAccount = await new Account(merged);
        createAccount.save().then(acc =>console.log(`Nouveau Compte -> ${acc.name}`));
    };

    client.getAccount = async account => {
        let data = await Account.findOne({ name : account});
        if(data){
            return data;
        } 
        else{
            await client.createAccount({
                name: account
            });
        data = await Account.findOne({ name : account});
        return data;
        }
    };

    client.updateAccount = async (account, settings) => {
        let data = await client.getAccount(account);
        if (typeof data !== "object") data ={};
        for (const key in settings) {
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    client.deleteAccount = async (account) => {
        let data = await client.getAccount(account)
        return data.deleteOne();
    };

    client.createAPI = async () => {
        let api = {}
        const merged = Object.assign({ _id : mongoose.Types.ObjectId()},
        api);
        const createAPI = await new API(merged);
        createAPI.save();
};

};
