const { MessageEmbed } = require("discord.js")

module.exports = async (bot,channel) => {
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit : 1, 
        type : 'CHANNEL_CREATE'
    });

    const latestChannelCreated = fetchGuildAuditLogs.entries.first();
    console.log(latestChannelCreated);
    const {executor } = latestChannelCreated;

    const embed = new MessageEmbed()
    .setAuthor("Création d'un nouveau Salon")
    .setColor("#fd7aff")
    .setDescription(`**Action**: création de Salon\n**Salon crée**: ${channel.name}`)
    .setTimestamp()
    .setFooter(executor.username, executor.displayAvatarURL());
    bot.channels.cache.get('822529856381649005').send(embed);
}