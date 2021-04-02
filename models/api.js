const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    jwtToken : {
        token : String,
        expires_at : Number
    }
});

module.exports = mongoose.model("API", apiSchema);