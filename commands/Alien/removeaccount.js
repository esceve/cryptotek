const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client,message,args,settings,dbUser) => {
    let embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
            .setTimestamp()
            .setColor("#dc0000");
    for(const accName of args){
        let data = await client.getAccount(accName);
        if(!data){
            embed
            .addField(`${accName}`,`Le compte n'existe pas ou a déjà été supprimé de la base de données.    :x:`)

            .setFooter("Le compte n'est pas présent dans la DB.")

        } else if (!dbUser.accounts.includes(accName)){
            embed
            .addField(`${accName}`,`Vous ne pouvez pas supprimer un compte qui ne vous appartient pas. :x:`)
        }else {

            let acc = dbUser.accounts;
            acc.splice(acc.indexOf(accName),1);
            await client.updateUser(message.member.user, {accounts: acc});
            await client.deleteAccount(accName);
            embed
            .addField(`${accName}`,`Le compte ${accName} a bien été supprimé. :white_check_mark: `)
        }
    }
    message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.REMOVEACCOUNT;