
const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");


const http = require("http");
const express = require("express");
const cors = require("cors");
const apiInterfaces = require('./Interfaces/Front_interfaces');
   
require("dotenv").config();

const bot = new Client();
require("./util/functions")(bot);
require("./util/fetch")(bot);
bot.config = require("./config");
bot.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => bot[x] = new Collection());


//API IMPLEMENTATION
const PORT = 8081;
const app = express();
app.use(express.json());
const server = http.Server(app);
app.use(cors({ credentials: true, origin: true, exposedHeaders: ['x-auth-token'] }));
app.use('/api', apiInterfaces);

server.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});

//END API IMPLEMENTATION

loadCommands(bot);
loadEvents(bot);
bot.mongoose.init();

 bot.login(process.env.TOKEN);

setInterval(async () => {
   console.log("[INFO] Updating last drop NTF's...");
   await bot.showLastNFTs();
   console.log("Finish!");
},600000)

setInterval(async () => {
   console.log("[INFO] Updating shitlist on account...");
   await bot.updateShitlist();
   console.log("Finish!");
}, 900000)

setInterval(async () => {
   console.log("[INFO] Updating Balance bot...")
   await bot.updateAllBalances();
   console.log("Finish!");
}, 420000)

setInterval( async () =>{
   console.log("[INFO] Updating stuck bot warning...")
   await bot.updateDontMint()
   console.log("Finish!");
},6800000) 
