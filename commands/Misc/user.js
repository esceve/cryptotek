const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.MISC.USER;

module.exports.run = (client,message,args) => {
    message.channel.send(` Tu es l'utilisateur ${message.author.tag}.`);
};