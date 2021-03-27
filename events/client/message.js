const {Collection } = require("discord.js");


module.exports = async (bot,message) => {
    // if(message.channel.type === "dm") return client.emit('directMessage',message);
    const settings = await bot.getGuild(message.guild);
    let dbUser = await bot.getUser(message.member);
    if(message.author.bot) return;

    if(!dbUser) await bot.createUser({
        guildID : message.member.guild.id,
        guildName : message.member.guild.name,
        userID : message.member.id,
        username : message.member.user.tag,
    });

    //Vérification pour éviter que le bot ne se réponde à lui-même
    if(!message.content.startsWith(settings.prefix)) return;
    //                                                                                                                               //

    //Récupération des arguments et du nom de la commande
    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    //                                                                                                                               //
    //Stockage de la commande à partir de son nom ou de ses aliases et existence de celle-ci
    const command = bot.commands.get(commandName) 
    || bot.commands.find(cmd => cmd.help.aliases 
        && cmd.help.aliases.includes(commandName));

    if(!command) return message.reply(`Cette commande n'existe pas!\nVeuillez taper \`!help\` pour connaître les commandes disponibles.`);
    //                                                                                                                               //
    //Gestion des arguments
    if(command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author} !` ;

        if(command.help.usage) noArgsReply+= `\nVoici comment utiliser la commande : \`${settings.prefix}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }
    //                                                                                                                               //
    //GESTION DU COOLDOWN
    if(!bot.cooldowns.has(command.help.name)){
        bot.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = bot.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5)*1000;

    if(tStamps.has(message.author.id)){
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if(timeNow < cdExpirationTime){
            timeLeft = (cdExpirationTime - timeNow)/1000;
            return message.channel.send(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
        }

    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(()=> tStamps.delete(message.author.id), cdAmount);
    //                                                                                                                               //
    //Execution de la commande
    dbUser = await bot.getUser(message.member);
    command.run(bot,message,args, settings,dbUser);
}