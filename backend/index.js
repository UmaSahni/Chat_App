const express = require("express")
const cors = require('cors')
const colors = require('colors');
const { connect } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { chatRoute } = require("./routes/chat.route");
const { auth } = require("./Middleware/auth");
const { messageRoute } = require("./routes/message.route");
const app = express()
require('dotenv').config()
const {Server} = require("socket.io")
const http = require ("http")

const path = require("path")

// & <--- Middlewares --->
app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/chat", auth, chatRoute)
app.use("/message", auth, messageRoute)

const server = http.createServer(app)


//<-------------- Deployment --------------->
const __dirname1 = path.resolve()
if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname1,"fronted/build")))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname1, "fronted", "build", "index.html"))
    })
}
else{
    app.get("/", (req, res)=>{
        res.send("API is running successfully")
    })
}
//<-------------- Deployment --------------->

server.listen(process.env.PORT, async () => {
    try {
        await connect
        console.log("Connected to mongoDB".bold.bgBrightMagenta)
    } catch (error) {
        console.log(error)
        console.log("Error in connecting to mongoDB".underline.red)
    }
    console.log(`${process.env.PORT} ---> running on port`.bgBlue)
})

const io = new Server(server ,{
    cors: {
        origin: "http://localhost:3000", // or your React client URL
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{


    socket.on("setup", (userData)=>{
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    })


socket.on("join chat", (room)=>{
    socket.join(room)
    console.log("User Joined Room" + room)
})

socket.on("new message", (newMessageRecieved)=>{
    var chat =  newMessageRecieved.chat;

    if(!chat.users) return console.log("Chat.user not defined")
    
    chat.users.forEach(user =>{
        if(user._id == newMessageRecieved.sender._id) return

        socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
})

socket.off("setup", ()=>{
    console.log("User Disconneted")
    socket.leave(userData._id)
})
})


// app.listen(process.env.PORT, async()=>{
//     try {
//         await connect
//         console.log("Connected to mongoDB".bold.bgBrightMagenta)
//     } catch (error) {
//         console.log(error)
//         console.log("Error in connecting to mongoDB".underline.red)
//     }
//     console.log(`${process.env.PORT} ---> running on port`.bgBlue)
// })
