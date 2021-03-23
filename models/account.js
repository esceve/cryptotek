const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : String,
    name: String,
    nbTLM: {
        "type" : String,
        "default" : 0
    },
    nbWAX: {
        "type" : String,
        "default" : 0
    },
    isShitListed: {
        "type" : Boolean,
        "default" : false
    },
    NFTs: [{
        name: String,
        qty: {
            "type" : Number,
            "default" : 0
        },
        scarcity: String,
        price: String,
        img: String
    }]
});

module.exports = mongoose.model("Account", accountSchema);