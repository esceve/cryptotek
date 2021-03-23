const {MessageEmbed} = require('discord.js');
const {MESSAGES} = require('../../util/constants');

module.exports.help = MESSAGES.COMMANDS.MISC.EMBED;

module.exports.run = (client,message,args) => {
    const embed = new MessageEmbed()
        .setColor("#dc143c")
        .setTitle("Titre de l'embed")
        .setURL("https://google.fr")
        .setDescription("Description de l'embed")
        .addField("Je suis un champ","et je suis sa valeur")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            {name:'Je suis le champ 1 ', value :'et je suis sa valeur', inline: true},
            {name:'Je suis le champ 2', value :'et en plus, on est alignés', inline: true}
        )
        .setImage(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter("Je suis un Footer");

        message.channel.send(embed);
};

