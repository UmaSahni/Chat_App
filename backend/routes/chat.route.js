const express = require("express")
const { accessChat, fetchChats, createGroupChats, renameGroup, addToGroup, remonveFromGroup } = require("../controllers/chat.controller")

const chatRoute = express.Router()

//<---- Creating or fetching one on chats ---->
chatRoute.post("/", accessChat)

// <---- getting all chats of a perticalur user ---->
chatRoute.get("/", fetchChats )

// <---- Creation of the group ---->
chatRoute.post("/group", createGroupChats)

// <---- Update a name of the group ---->
chatRoute.put("/rename", renameGroup )

// <---- Remove from the group ---->
chatRoute.put("/groupremove", remonveFromGroup)

//<---- Add to the group ---->
chatRoute.put("/addtogroup", addToGroup)

module.exports = { chatRoute }