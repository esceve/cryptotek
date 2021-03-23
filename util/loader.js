const {readdirSync} = require('fs');

//Récupère toutes les commandes dans les sous-dossiers présent dans le dossier commands
const loadCommands = (bot,dir ="./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for(const file of commands){
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            bot.commands.set(getFileName.help.name,getFileName);
            console.log(`Commande chargée : ${getFileName.help.name}`);
        };
    });
};


//Récupère toutes les évenements dans les sous-dossiers présent dans le dossier events
const loadEvents = (bot,dir ="./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for(const event of events){
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            bot.on(evtName, evt.bind(null, bot));
            console.log(`Évenement chargé : ${evtName}`);
        };
    });
};

module.exports = {
    loadCommands,
    loadEvents
}