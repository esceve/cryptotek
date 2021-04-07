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
    let accountsName = []

    for(const accountName of args){
        if(accountName.endsWith(".wam")) accountsName.push(accountName)
    }
    let i = 0;
    for(const accName of accountsName){
        i++;
        let data = await client.getAccount(accName);
        if(data){
            await client.updateAccount(accName, { isShitListed : false});
            if(i > 24){
                embed2.addField(`Bot `, `${accName} a déjà été retiré de la shitlist`)
            }else{
                embed.addField(`Bot `, `${accName} a déjà été retiré de la shitlist`)
            }
            
        }else { // Cas où le compte n'a pas été créé
            if(i>24){
                embed2.addField(`Bot `, `${accName} n'existe pas.`)
            }else{
                embed.addField(`Bot `, `${accName} n'existe pas.`)
            }
        }
    } 
    message.channel.send(embed);
    if(i>24) message.channel.send(embed2);
    
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.UNSHIT;