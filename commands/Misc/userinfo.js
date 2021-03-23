const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;

module.exports.run = (client,message,args) => {
    const user_mention = message.mentions.users.first();
    message.channel.send(`Voici le tag de la personne que vous avez mentionné : ${user_mention.tag}.`);
};
