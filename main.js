
const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");


const http = require("http");
const https = require("https");
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

const privateKey = fs.readFileSync('/etc/letsencrypt/live/stonk.retrogala.ovh/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/stonk.retrogala.ovh/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/stonk.retrogala.ovh/chain.pem', 'utf8');

const creditentials = {
   key: privateKey,
   cert: certificate,
   ca: ca
};

const PORT = 80;
const PORTHTTPS = 443;
const app = express();
app.use(express.json());
const httpServer= http.Server(app);
const httpsServer = https.Server(creditentials, app);
app.use(cors({ credentials: true, origin: true, exposedHeaders: ['x-auth-token'] }));
app.use('/api', apiInterfaces);

httpServer.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});
httpsServer.listen(PORT, function () {
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
