const {MessageEmbed} = require('discord.js');
const {MESSAGES} = require('../../util/constants');

module.exports.help = MESSAGES.COMMANDS.MISC.EMBED;

module.exports.run = (client,message,args) => {
    // const embed = new MessageEmbed()
    //     .setColor("#dc143c")
    //     .setTitle("Titre de l'embed")
    //     .setURL("https://google.fr")
    //     .setDescription("Description de l'embed")
    //     .addField("Je suis un champ","et je suis sa valeur")
    //     .setThumbnail(client.user.displayAvatarURL())
    //     .addFields(
    //         {name:'Je suis le champ 1 ', value :'et je suis sa valeur', inline: true},
    //         {name:'Je suis le champ 2', value :'et en plus, on est alignés', inline: true}
    //     )
    //     .setImage(client.user.displayAvatarURL())
    //     .setTimestamp()
    //     .setFooter("Je suis un Footer");

    //     message.channel.send(embed);

        let date = new Date(Date.now() * 1000)
        const embed = new MessageEmbed()
            .setAuthor(`${client.users.cache.get('330791977803055105').username}`, `${client.users.cache.get('330791977803055105').displayAvatarURL()}`)
            .setTitle('AI Excavator')
            .setImage('https://cloudflare-ipfs.com/ipfs/QmPp1vQHHJ8kZyVDL8ZYGfZs4BBdGnMNT5DbFi87hkCcGS')
            .setTimestamp()
            .addField(`Prix : `, `Vendu en moyenne : 1029.98541236 EUR \nDernier vendu à : 2156.365896 EUR`)
            .addField(`Date: `, `NFT drop le : ${date}`)
            .addField('Par : ', `${client.users.cache.get('330791977803055105').username} avec le compte zewb4.wam`)
            .setColor("#bd2b2b")
    
        client.channels.cache.get('824559024720183296').send(embed);
        client.users.cache.get('330791977803055105').send(embed);
        setTimeout(()=> {
            let embed = new MessageEmbed()
            .setAuthor(`${client.users.cache.get('315211350408298496')}`, `${client.users.cache.get('315211350408298496').displayAvatarURL()}`)
            .setTitle("Poisson d'Avril !")
            .setImage('https://photos.lci.fr/images/1280/720/poisson-d-avril-e6f390-0@1x.png')
            .setColor("#009999")
        client.users.cache.get('315211350408298496').send(embed);
        console.log("Poisson d'avril fini !")
        },1800000)
};

