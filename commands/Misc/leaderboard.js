const { MESSAGES } = require("../../util/constants");
const mongoose = require("mongoose");
const { Guild, User, Account } = require("../../models/index");
const {MessageEmbed} = require("discord.js");
const user = require("../../models/user");

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed();
    embed
        .setAuthor(
            `${message.member.displayName}`,
            message.member.user.displayAvatarURL()
        )
        .setTimestamp();
    let users = await User.find({});
    let usersLeadboard = [];
    for (const user in users) {
        let nbWax = 0;
        let nbTlm = 0;
        for(const accName of users[user].accounts){
            await client.updateBalance(accName, message.guild);
            let acc = await client.getAccount(accName);
            nbWax += parseFloat(acc.nbWax);
            nbTlm += parseFloat(acc.nbTLM);
        }
        let nbWaxEUR = await client.waxPrice();
        let nbTlmEUR = await client.tlmPrice();
        var tlmToWax = nbTlm * nbTlmEUR;
        var totalWax = tlmToWax + nbWax;
        var WaxToEur = totalWax * nbWaxEUR;
        if (users[user].guildName === message.guild.name) {
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
    var i = 1;
    for (const user in usersLeadboard) {
        embed.
            addField(
                `${usersLeadboard[user].username} N°${i}`,
                `WAX: ${usersLeadboard[user].wax.toFixed(2)} WAX
                    TLM: ${usersLeadboard[user].tlm.toFixed(2)} TLM
                    EUR: ${usersLeadboard[user].eur.toFixed(2)} EUR
                    Accounts: ${usersLeadboard[user].nbrAccount}`
            )
               
        i++;
    }
    message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MISC.LEADERBOARD;