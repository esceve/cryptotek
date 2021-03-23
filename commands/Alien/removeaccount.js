const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client,message,args,settings,dbUser) => {
    const accName = args[0];
    let data = await client.getAccount(accName);
    if(data){
        const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
        .setDescription(`Le compte ${accName} n'existe pas ou a déjà été supprimé.`)
        .setColor("#dc0000")
        .setFooter("Le compte n'existe pas.")
        .setTimestamp();
        message.channel.send(embed);
        return;
    } else if (!dbUser.accounts.includes(accName)){
        const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
        .setDescription(`Vous ne pouvez pas supprimer un compte qui ne vous appartient pas.`)
        .setColor("#dc0000")
        .setFooter("Ce compte appartient à quelqu'un d'autre.")
        .setTimestamp();
        message.channel.send(embed);
        return;
    }else {

        let acc = dbUser.accounts;
        acc.splice(acc.indexOf(accName),1);
        await client.updateUser(message.member.user, {accounts: acc});
        await client.deleteAccount(accName);
        const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
        .setDescription(`Le compte ${accName} a bien été supprimé.`)
        .setColor("#92f058")
        .setFooter("Ce compte a été supprimé avec succès")
        .setTimestamp();
        message.channel.send(embed);
    }
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.ADDACCOUNT;