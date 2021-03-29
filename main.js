
const { Client, Collection } = require("discord.js");
const {loadCommands,loadEvents} = require("./util/loader");

require("dotenv").config();

const bot = new Client();
require("./util/functions")(bot);
require("./util/fetch")(bot);
bot.config = require("./config");
bot.mongoose = require("./util/mongoose");

["commands", "cooldowns"].forEach(x => bot[x] = new Collection());

loadCommands(bot);
loadEvents(bot);
bot.mongoose.init();

 bot.login(process.env.TOKEN);

 setInterval( async () =>{
    await bot.showLastNFTs()
 },600000)

 setInterval( async () =>{
   await bot.updateShitlist()
},10800000)