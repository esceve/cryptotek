const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.MISC.SERVER;
module.exports.run = (client,message,args) => {
    message.channel.send(`Tu es sur le serveur ${message.guild.name}.`);
};