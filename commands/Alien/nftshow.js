const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = (client,message,args) => {
   await client.showLastNFTs()
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.NFTSHOW;