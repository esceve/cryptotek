const MESSAGES = {
    COMMANDS: {
        MISC: {
            SAY : {
                name : 'say',
                aliases : ['repeat','rep'],
                category : 'misc',
                description : "Répète le message d'un utilisateur",
                args : true,
                usage : '<votre_message>',
                cooldown : 10
            },
            EMBED : {
                name : 'embed',
                aliases : ['emb','e'],
                category : 'misc',
                description : "Renvoie un embed",
                args : false,
                usage : '',
                cooldown : 10
            },
            HELP : {
                name : 'help',
                aliases : ['help'],
                category : 'misc',
                description : "Renvoie une liste de commandes ou les informations sur une seule",
                args : false,
                usage : '<command_name>',
                cooldown : 3
            },
            SERVER : {
                name : 'server',
                aliases : ['srv','s'],
                category : 'misc',
                description : "Renvoie le nom du serveur sur leque l'utilisateur se trouve",
                args : false,
                usage : '',
                cooldown : 10
            },
            USER : {
                name: 'user',
                aliases : ['usr'],
                category : 'misc',
                description : "renvoie le nom et le tag de l'utilisateur",
                args : false,
                usage : '',
                cooldown : 10
            },
            USERINFO : {
                name : 'userinfo',
                aliases : ['useri','uinfo'],
                category : 'misc',
                description : "renvoie les informations d'un utilisateur mentionné",
                args: true,
                usage : '@<utilisateur>',
                cooldown : 10
            },
            PRICE : {
                name: 'price',
                aliases: ['price', 'currency'],
                category: 'misc',
                description: "indique le court a l'instant T du WAX->EUR et TLM->WAX",
                args: false,
                usage: '',
                cooldown: 2
            },
            LEADERBOARD: {
                name: 'leaderboard',
                aliases: ['leaderboard', 'lb'],
                category: 'misc',
                description: "Donne le tableau des score de tout les membres",
                args: false,
                usage: '',
                cooldown: 2
            }
        },
        ADMIN : {
            EVAL : {
                name : 'eval',
                aliases : ['eval'],
                category : 'admin',
                description : "renvoie un code js testé",
                args: true,
                usage : '<code_to_test>',
                cooldown : 3

            },
            CONFIG : {
                name : 'config',
                aliases : ['config'],
                category : 'admin',
                description : "Modifie la base de données",
                args: true,
                usage : '<key> <value>',
                cooldown : 3
            },
            RELOAD : {
                name : 'reload',
                aliases : ['reload'],
                category : 'admin',
                description : "relance le bot",
                args: false,
                usage : '',
                cooldown : 3

            }
        },
        ALIEN : {
            ADDACCOUNT : {
                name : 'addaccount',
                aliases : ['addaccount', 'mkacc'],
                category : 'alien',
                description : "Ajoute un compte AlienWorlds à la base de données",
                args: true,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            },
            REMOVEACCOUNT : {
                name : 'removeaccount',
                aliases : ['removeaccount', 'rmacc'],
                category : 'alien',
                description : "Supprime un compte AlienWorlds de la base de données",
                args: true,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            },
            CHECKBALANCE : {
                name : 'checkbalance',
                aliases : ['checkbalance','balance'],
                category : 'alien',
                description : "Renvoie la quantité de WAX/TLM du compte.\nSans paramètres, la commande renvoie la quantité de WAX/TLM de tous les comptes associés à l'utilisateur.",
                args: false,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            },
            SHOWACCOUNT : {
                name : 'showaccount',
                aliases : ['showaccount', 'showacc'],
                category : 'alien',
                description : "Affiche le nom des comptes AlienWorlds de l'utilisateur",
                args: false,
                usage : '',
                cooldown : 2

            },
            UPDATESHITLIST : {
                name : 'updateshitlist',
                aliases : ['updateshitlist','upshit'],
                category : 'alien',
                description : "Update la shitlist est envoit un mp aux utilisateur qui ont des comptes shitlistés",
                args: false,
                usage : '',
                cooldown : 2

            },
            SHITLIST : {
                name : 'shitlist',
                aliases : ['shitlist', 'sl'],
                category : 'alien',
                description : "Indique si le compte spécifié en argument est shitlisté",
                args: true,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            },
            NFTSHOW: {
                name: 'ntfshow',
                aliases: ['nftshow', 'ns'],
                category: 'alien',
                description: 'Affiche le dernier nft rare trouvai',
                args: false,
                usage: '',
                cooldown: 2
            },
            TOTAL: {
                name: 'total',
                aliases: ['total'],
                category: 'alien',
                description: 'Total de votre balance',
                args: false,
                usage: '',
                cooldown: 2
            },
            UPDATEDONTMINT : {
                name : 'updatedontmint',
                aliases : ['updatedontmint','upmint'],
                category : 'alien',
                description : "Update DontMint",
                args: false,
                usage : '',
                cooldown : 2

            }
        }
    }
}

exports.MESSAGES = MESSAGES;