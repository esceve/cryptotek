module.exports = bot => {
    console.log(`logged in as ${bot.user.tag} !`);
    bot.channels.cache.get('822127771068137506').send("Le bot est opérationnel!");
}