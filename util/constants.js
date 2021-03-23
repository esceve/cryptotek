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
                description : "ajoute un compte AlienWorlds à la base de données",
                args: true,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            },
            CHECKBALANCE : {
                name : 'checkbalance',
                aliases : ['checkbalance','balance'],
                category : 'alien',
                description : "Renvoie la quantité de WAX/TLM de l'utilisateur",
                args: false,
                usage : '<@nom_du_compte.wam>',
                cooldown : 2

            }
        }
    }
}

exports.MESSAGES = MESSAGES;