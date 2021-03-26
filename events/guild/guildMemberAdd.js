const {MessageEmbed} = require("discord.js");

module.exports = async (client,member) => {
    // const embed = new MessageEmbed()
    // .setAuthor(`${member.displayName} (${member.id})`,member.user.displayAvatarURL())
    // .setColor("#35f092")
    // .setFooter("Un utilisateur nous a rejoint")
    // .setTimestamp();

    // client.channels.cache.get('822529856381649005').send(embed);
    const user = await User.findOne({username : member.user.tag})
    if(!user){
        await client.createUser({
            guildID : member.guild.id,
            guildName : member.guild.name,
            userID : member.id,
            username : member.user.tag,
        });
    }

}