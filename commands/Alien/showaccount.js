const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
    setTimeout(async () => {
            let user = await client.getUser(message.member.user);
            const embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
            .setTimestamp();
            if(!user.accounts.length) {
                embed
                .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
                .setColor("#dc5500")
            }else {
                for(let i = 0; i < user.accounts.length;i++){
                    embed
                    .addField(`${i}: `,`${user.accounts[i]}`,true)
                    .setColor("#006699");
                }
            }
            message.channel.send(embed);
        },1000);

};

module.exports.help = MESSAGES.COMMANDS.ALIEN.SHOWACCOUNT;
