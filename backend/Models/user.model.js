const mongoose = require("mongoose")

const user = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    pic: { type: String },
})

const UserModel = mongoose.model("user", user)

module.exports = { UserModel }