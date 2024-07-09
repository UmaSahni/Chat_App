const { ChatModel } = require("../Models/chat.model")
const { MessageModel } = require("../Models/message.model")
const { UserModel } = require("../Models/user.model")

const sendMessage = async(req, res)=>{
    const {content, chatId} = req.body
    if (!content || !chatId) {
        console.log("Invalid data pessed into request")
        return res.sendStatus(400)
    }
    console.log(req.user)
    var newMessage = {
        sender: req.user, // current user's ID
        content: content,
        chat: chatId
    }
    
    try {
    var message = await MessageModel.create(newMessage)
        
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await UserModel.populate(message, {
             path:"chat.users",
             select:"name pic email"
        })
        await ChatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage : message
        })
        res.json(message)
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const allMessages = async(req, res) =>{
try {
    const messages = await MessageModel.find({chat:req.params.chatId}).populate("sender", "name pic email")
    .populate("chat")
res.json(messages)
    
} catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
}
}



module.exports = { sendMessage, allMessages }