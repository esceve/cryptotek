const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
    let date = new Date(Date.now() * 1000)
    let embed = new MessageEmbed()
        .setAuthor(`${client.users.cache.get('315211350408298496')}`, `${client.users.cache.get('315211350408298496').displayAvatarURL()}`)
        .setTitle('AI Excavator')
        .setImage('https://cloudflare-ipfs.com/ipfs/QmPp1vQHHJ8kZyVDL8ZYGfZs4BBdGnMNT5DbFi87hkCcGS')
        .setTimestamp(date)
        .addField(`Prix : `, `Vendu en moyenne : 1029.98541236 EUR \nDernier vendu à : 2156.365896 EUR`)
        .addField(`Date: `, `NFT drop le : ${date}`)
        .addField('Par : ', `${client.users.cache.get('330791977803055105').username} avec le compte mysb2.wam`)
        .setColor("#bd2b2b")
    client.channels.cache.get('822127771068137506').send(embed);
    client.users.cache.get('315211350408298496').send(embed);
    console.log("J'ai envoyé le poisson d'avril !")
    // setTimeout(()=> {
    //     let embed = new MessageEmbed()
    //     .setAuthor(`${client.users.cache.get('315211350408298496')}`, `${client.users.cache.get('315211350408298496').displayAvatarURL()}`)
    //     .setTitle("Poisson d'Avril !")
    //     .setImage('https://photos.lci.fr/images/1280/720/poisson-d-avril-e6f390-0@1x.png')
    //     .setColor("#009999")
    // client.users.cache.get('315211350408298496').send(embed);
    // console.log("Poisson d'avril fini !")
    // },600000)
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.NFTSHOW;