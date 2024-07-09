const express = require("express")
const { sendMessage, allMessages } = require("../controllers/message.controllers")

const messageRoute = express.Router()

messageRoute.post("/", sendMessage)
messageRoute.get("/:chatId", allMessages)

module.exports ={messageRoute}