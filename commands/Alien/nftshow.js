const { MESSAGES } = require("../../util/constants");
const {MessageEmbed} = require('discord.js');
module.exports.run = async (client,message,args) => {
    let date = new Date(Date.now() * 1000)
    let embed = new MessageEmbed()
        .setAuthor(`${client.users.cache.get('330791977803055105')}`, `${client.users.cache.get('330791977803055105').displayAvatarURL()}`)
        .setTitle('AI Excavator')
        .setImage('https://cloudflare-ipfs.com/ipfs/QmPp1vQHHJ8kZyVDL8ZYGfZs4BBdGnMNT5DbFi87hkCcGS')
        .setTimestamp(date)
        .addField(`Prix : `, `Vendu en moyenne : 1029.98541236 EUR \nDernier vendu à : 2156.365896 EUR`)
        .addField(`Date: `, `NFT drop le : ${date}`)
        .addField('Par : ', `${client.users.fetch('330791977803055105').username} avec le compte mysb2.wam`)
        .setColor("#bd2b2b")
    client.channels.cache.get('824559024720183296').send(embed);
    client.users.cache.get('330791977803055105').send(embed);
    setTimeout(()=> {
        let embed = new MessageEmbed()
        .setAuthor(`${client.users.cache.get('330791977803055105')}`, `${client.users.cache.get('330791977803055105').displayAvatarURL()}`)
        .setTitle("Poisson d'Avril !")
        .setImage('https://photos.lci.fr/images/1280/720/poisson-d-avril-e6f390-0@1x.png')
        .setColor("#009999")
    client.users.cache.get('330791977803055105').send(embed);
    },600000)
};

module.exports.help = MESSAGES.COMMANDS.ALIEN.NFTSHOW;