const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');

module.exports.run = async (client,message,args) => {
        const accName = args[0];
        await client.getAccount(accName)
        await client.isShitListed(accName)
        setTimeout(async ()=> {
            let account = await client.getAccount(accName)
            let embed = new MessageEmbed()
                .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
                .setTimestamp()
            if(account.isShitListed){
                embed
                .setColor("#990000")
                .addField(`:warning: ${accName} :warning:`,`Ce compte est shitlisté`);
                
            }else {
                embed
                .setColor("#009922")
                .addField(`:white_check_mark: ${accName}`,`Ce compte n'est pas shitlisté`);
            }
            message.channel.send(embed);
        },500)


};

module.exports.help = MESSAGES.COMMANDS.ALIEN.SHITLIST;