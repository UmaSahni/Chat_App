const mongoose = require("mongoose")
require('dotenv').config()

console.log(process.env.MONGO_URL)
const connect = mongoose.connect(process.env.MONGO_URL)

module.exports = {connect}