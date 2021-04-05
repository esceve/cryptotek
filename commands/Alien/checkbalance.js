const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {

        let nbWax = 0;
        let nbTlm = 0;
        let user = await client.getUser(message.member.user);
        let embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
            .setTimestamp();
        let embed2 = new MessageEmbed()
            .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
            .setTimestamp();
        let i = 0;
            
        if(!user.accounts.length) {
            embed
            .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
            .setColor("#dc5500")
        } else {
            for (const accName of user.accounts) {

                let acc = await client.getAccount(accName);
                nbWax += parseFloat(acc.nbWAX);
                nbTlm += parseFloat(acc.nbTLM);
                if(i>24){
                embed2
                    .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${acc.nbWAX}\nNombre de TLM: ${acc.nbTLM}`)
                    .setColor("#006699");
                }else{
                    embed
                    .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${acc.nbWAX}\nNombre de TLM: ${acc.nbTLM}`)
                    .setColor("#006699");
                }
               
            }
        }
        let nbWaxEUR = await client.waxPrice();
        let nbTlmEUR = await client.tlmPrice();
        var tlmToWax = nbTlm * nbTlmEUR;
        var totalWax = tlmToWax + nbWax;
        var WaxToEur = totalWax * nbWaxEUR;
        if(i>24){
            embed2.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${WaxToEur} EUR`)
        }else{
            embed.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${WaxToEur} EUR`)
        }
        client.users.cache.get(message.member.user.id).send(embed);
        client.users.cache.get(message.member.user.id).send(embed2);
        message.delete();

};

module.exports.help = MESSAGES.COMMANDS.ALIEN.CHECKBALANCE;