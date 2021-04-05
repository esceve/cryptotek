const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
    let j= 0;
    let user = await client.getUser(message.member.user);
    const embed = new MessageEmbed()
    .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
    .setTimestamp();
    const embed2 = new MessageEmbed()
    .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
    .setTimestamp();
    if(!user.accounts.length) {
        embed
        .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
        .setColor("#dc5500")
    }else {
        for(let i = 0; i < user.accounts.length;i++){
            j++;
            if(j > 24){
                embed2
                    .addField(`Compte n°${i} : `,`${user.accounts[i]}`)
                    .setColor("#006699");
            }else{
                embed
                .addField(`Compte n°${i} : `,`${user.accounts[i]}`)
                .setColor("#006699");
            }

        }
    }
    message.channel.send(embed);
    if(j> 24) message.channel.send(embed2);
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.SHOWACCOUNT;