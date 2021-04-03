const { MESSAGES } = require("../../util/constants");
 
module.exports.run = async (client, message, args) => {
 await client.createAPI();
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.CREATEAPI;
