const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
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
            //await client.updateBalance(accName, message.guild)
            let acc = await client.getAccount(accName);
            nbWax += parseFloat(acc.nbWAX);
            nbTlm += parseFloat(acc.nbTLM);
        }
    }
    let nbWaxEUR = await client.waxPrice();
    let nbTlmEUR = await client.tlmPrice();
    var tlmToWax = nbTlm * nbTlmEUR;
    var totalWax = tlmToWax + nbWax;
    var WaxToEur = totalWax * nbWaxEUR;
    embed.addField(`Total: `,`Nombre de WAX : ${nbWax} WAX\nNombre de TLM : ${nbTlm} TLM\nConversion: ${WaxToEur} EUR`)
    message.channel.send(embed);


};

module.exports.help = MESSAGES.COMMANDS.ALIEN.TOTAL;