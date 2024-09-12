const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }, 

    password: {
        type: String,
        required: true
    }
})

const Auth = new mongoose.model("auth", authSchema);
module.exports = Auth;