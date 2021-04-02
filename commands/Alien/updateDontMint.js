const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');

module.exports.run = async (client,message,args) => {
        await client.updateDontMint();

};

module.exports.help = MESSAGES.COMMANDS.ALIEN.UPDATEDONTMINT;