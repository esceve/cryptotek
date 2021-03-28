const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {

        if(!args.length) {
            let nbWax = 0;
            let nbTlm = 0;
            let user = await client.getUser(message.member.user);
            let embed = new MessageEmbed();
            embed
                .setAuthor(`${message.member.displayName}`,message.member.user.displayAvatarURL())
                .setTimestamp();
            if(!user.accounts.length) {
                embed
                .addField(`:warning:`,`Vous n'avez pas encore de compte, plus d'informations avec \`!help addaccount\``)
                .setColor("#dc5500")
            }else {
                for(const accName of user.accounts){
                    await client.isShitListed(accName);
                    let balance = await client.updateBalance(accName, message.guild)
                    let acc = await client.getAccount(accName);
                    nbWax += parseFloat(balance[0]);
                    nbTlm += parseFloat(balance[1]);
                    embed
                        .addField(`${acc.name}`,`Fonctionne: ${acc.isShitListed ? ":x:" : ":white_check_mark:"}\nNombre de WAX: ${balance[0]}\nNombre de TLM: ${balance[1]}`)
                        .setColor("#006699");
                }
            }
            let nbWaxEUR = await client.waxPrice();
            let nbTlmEUR = await client.tlmPrice();
            var tlmToWax = nbTlm * nbTlmEUR;
            var totalWax = tlmToWax + nbWax;
            var WaxToEur = totalWax * nbWaxEUR;
            embed.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${WaxToEur} EUR`)
            message.channel.send(embed);
        }else {
            let balance = await client.updateBalance(args[0],message.guild);
            await client.isShitListed(args[0]);
            let acc = await client.getAccount(args[0])
            var nbWax = parseFloat(balance[0]);
            var nbTlm = parseFloat(balance[1]);

            let nbWaxEUR = await client.waxPrice();
            let nbTlmEUR = await client.tlmPrice();
            var tlmToWax = nbTlm * nbTlmEUR;
            var totalWax = tlmToWax + nbWax;
            var WaxToEur = totalWax * nbWaxEUR;
            const embed = new MessageEmbed()
                .setAuthor(`${message.member.displayName} (${acc.name})`,message.member.user.displayAvatarURL())
                .addFields(
                    {name:'Nombre de WAX: ', value : `${balance[0]}`},
                    {name:'Nombre de TLM: ', value : `${balance[1]}`},
                    {name: 'Fonctionne: ', value: acc.isShitListed ? ":x:" : ":white_check_mark:"},
                    {name: "Conversion EUR", value:  `${WaxToEur} EUR`}
                )
                .setColor(acc.isShitListed ? "#990000" : "#009922")
                .setTimestamp();
                message.channel.send(embed);
        }


};

module.exports.help = MESSAGES.COMMANDS.ALIEN.CHECKBALANCE;