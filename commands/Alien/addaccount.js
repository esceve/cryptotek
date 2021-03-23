const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client,message,args,settings,dbUser) => {
    const embed = new MessageEmbed()
                .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
                .setColor("#92f058")
                .setFooter("Ce compte a été ajouté avec succès")
                .setTimestamp();
    args.forEach(accName => {
        let data = await client.getAccount(accName);
        if(data){
            embed
            .addField(`Bot `, `${accName} a déjà été ajouté par ${data.username}.`)
        }else {
            const compteExiste = await client.accountExist(accName,message.guild);
            if(compteExiste){
                await client.createAccount({
                    username : message.member.user.tag,
                    name : accName,
                });
                client.updateBalance(accName,message.guild)
                let acc = dbUser.accounts;
                if(!acc.includes(accName)) acc.push(accName);
                await client.updateUser(message.member.user, {accounts: acc});
                embed
                .addField(`Bot `,`${accName} ajouté avec succès`)
                
            }else {
                embed
                .addField(`Bot `, `${accName} n'existe pas.`)
            }

        }
    } )
    message.channel.send(embed);
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.ADDACCOUNT;