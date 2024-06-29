const mongoose = require("mongoose")

const user = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    pic: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
})

const UserModel = mongoose.model("user", user)

module.exports = { UserModel }