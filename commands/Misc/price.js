const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed();
    let priceWaxEUR = await client.waxPrice();
    let priceTlmWAX = await client.tlmPrice();
    let priceTlmEur = await client.tlmeurPrice();

    embed
        .setAuthor(`${message.member.displayName}`, message.member.user.displayAvatarURL())
        .addFields(
            { name: 'Cours TLM->WAX: ', value: `1 TLM = ${priceTlmWAX} WAX` },
            { name: 'Cours WAX->EUR: ', value: `1 WAX = ${priceWaxEUR} EUR` },
            { name: 'Cours TLM->EUR: ', value: `1 TLM = ${priceTlmEur} EUR` },
        )
        .setTimestamp();
    
    message.channel.send(embed);
}

module.exports.help = MESSAGES.COMMANDS.MISC.PRICE;