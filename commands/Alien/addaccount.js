const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client,message,args,settings,dbUser) => {
    const accName = args[0];
    let data = await client.getAccount(accName);
    if(data){
        const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
        .setDescription(`Le compte ${accName} a déjà été ajouté à la base de données par ${data.username}.`)
        .setColor("#dc0000")
        .setFooter("Le compte est déjà présent dans la base de données")
        .setTimestamp();
        message.channel.send(embed);
        return;
    }else {
        if(client.accountExist(accName,message.guild)){
            await client.createAccount({
                username : message.member.user.tag,
                name : accName,
            });
            
            setTimeout(async ()=> await client.updateBalance(accName,message.guild),1000)
            let acc = dbUser.accounts;
            if(!acc.includes(accName)) acc.push(accName);
            await client.updateUser(message.member.user, {accounts: acc});
    
            const embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
            .setDescription(`Le compte ${accName} a bien été ajouté.`)
            .setColor("#92f058")
            .setFooter("Ce compte a été ajouté avec succès")
            .setTimestamp();
            message.channel.send(embed);
        }else {
            const embed = new MessageEmbed()
            .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
            .setDescription(`Le compte ${accName} n'existe pas, veuillez vérifier si le nom du compte est correcte.`)
            .setColor("#dc0000")
            .setFooter("Nom de compte invalide.")
            .setTimestamp();
            message.channel.send(embed);
            return;
        }

    }
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.ADDACCOUNT;