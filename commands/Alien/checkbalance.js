const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
    if(!args.length) {
        let user = await client.getUser(message.member.user);
        const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
        .setTimestamp();
        if(!user.accounts.length) {
            embed
            .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
            .setColor("#dc5500")
        }else {
            for(const accName of user.accounts){
                await client.updateBalance(accName,message.guild);
                let acc = await client.getAccount(accName);
                embed
                .addField(`${acc.name}`,`Nombre de WAX : ${acc.nbWAX}\nNombre de TLM : ${acc.nbTLM}`)
                .setColor("#006699");
            }
        }
        
        message.channel.send(embed);
    }else {
        await client.updateBalance(args[0],message.guild);
        let acc = await client.getAccount(args[0])
        const embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName} (${acc.name})`,message.member.user.displayAvatarURL())
            .addFields(
                {name:'Nombre de WAX: ', value : acc.nbWAX, inline: true},
                {name:'Nombre de TLM: ', value : acc.nbTLM, inline: true}
            )
            .setColor("#006699")
            .setTimestamp();
            message.channel.send(embed);
    }

};

module.exports.help = MESSAGES.COMMANDS.ALIEN.CHECKBALANCE;