const mongoose = require("mongoose")

const chat = mongoose.Schema({
    chatName : {type:String, trim:true},
    isGroup : {type:Boolean, default:false},
    users :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserModel"
        }
    ],
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"MessageModel"
    },
    groupAdmin :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
},{
    timestamps:true
})

const ChatModel = mongoose.model("chat", chat)

module.exports = {ChatModel}