const {MESSAGES} = require('../../util/constants');



module.exports.run = async (client,message,args) => {
    await message.delete();
    await message.channel.send("Le bot redémarre");
    process.exit();
};
module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOAD;