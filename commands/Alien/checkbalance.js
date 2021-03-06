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
        let embed3 = new MessageEmbed()
            .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
            .setTimestamp();
        let i = 0;
            
        if(!user.accounts.length) {
            embed
            .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
            .setColor("#dc5500")
        } else {
            for (const accName of user.accounts) {
                i++;
                let acc = await client.getAccount(accName);
                if(!acc){
                    
                    await client.createAccount({
                        username: message.member.user.tag,
                        name: accName,
                    });
                    await client.isShitListed(accName)
                    await client.updateBalance(accName,message.guild)
                }
                nbWax += parseFloat(acc.nbWAX);
                nbTlm += parseFloat(acc.nbTLM);
                if(i>24){
                embed2
                    .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${acc.nbWAX}\nNombre de TLM: ${acc.nbTLM}`)
                    .setColor("#006699");
                }else if(i>48){
                    embed3
                    .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${acc.nbWAX}\nNombre de TLM: ${acc.nbTLM}`)
                    .setColor("#006699");
                }else if(i<=24){
                    embed
                    .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${acc.nbWAX}\nNombre de TLM: ${acc.nbTLM}`)
                    .setColor("#006699");
                }
               
            }
        }
        let nbWaxEUR = await client.waxPrice();
        let nbTlmEUR = await client.tlmeurPrice();
        var tlmToEUr = nbTlm * nbTlmEUR;
        var WaxToEur = nbWax * nbWaxEUR;
        var EurTot = tlmToEUr + WaxToEur;
        if(i>24){
            embed2.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${EurTot} EUR`)
        }else if(i>48){
            embed3.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${EurTot} EUR`)
        }else if(i<=24){
            embed.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${EurTot} EUR`)
        }
        client.users.cache.get(message.member.user.id).send(embed);
        if(i>24) client.users.cache.get(message.member.user.id).send(embed2);
        if(i>48) client.users.cache.get(message.member.user.id).send(embed3);
        message.delete();

};

module.exports.help = MESSAGES.COMMANDS.ALIEN.CHECKBALANCE;