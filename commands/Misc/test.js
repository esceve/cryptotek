const {MESSAGES} = require('../../util/constants');

module.exports.help = MESSAGES.COMMANDS.MISC.TEST;

module.exports.run = (client,message,args) => {
    message.channel.send(args.join(" "));
};
