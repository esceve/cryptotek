const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require("discord.js");

module.exports.run = async (client,message,args,settings,dbUser) => {
    let embed = new MessageEmbed()
                .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
                .setColor("#92f058")
                .setTimestamp();
    let embed2 = new MessageEmbed()
                .setAuthor(`${message.member.displayName} (${message.member.id})`,message.member.user.displayAvatarURL())
                .setColor("#92f058")
                .setTimestamp();
    let i = 0;
    for(const accName of args){
        i++;
        let data = await client.getAccount(accName);

        if(data){
            if(i > 24){
                embed2.addField(`Bot `, `${accName} a déjà été ajouté par ${data.username}.`)
            }else{
                embed.addField(`Bot `, `${accName} a déjà été ajouté par ${data.username}.`)
            }
            
        }else { // Cas où le compte n'a pas été créé
            const compteExiste = await client.accountExist(accName,message.guild);
            if (compteExiste) { //On l'ajoute si et seulement si il existe
                await client.createAccount({
                    username: message.member.user.tag,
                    name: accName,
                });
                let acc = dbUser.accounts;
                if(!acc.includes(accName)) acc.push(accName);
                await client.updateUser(message.member.user, {accounts: acc});
                if(i>24){
                    embed2.addField(`Bot `,`${accName} ajouté avec succès`)
                }else{
                    embed.addField(`Bot `,`${accName} ajouté avec succès`)
                }
                
                
            }else {
                if(i>24){
                    embed2.addField(`Bot `, `${accName} n'existe pas.`)
                }else{
                    embed.addField(`Bot `, `${accName} n'existe pas.`)
                }
            }

        }
    } 
    message.channel.send(embed);
    if(i>24) message.channel.send(embed2);
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.ADDACCOUNT;