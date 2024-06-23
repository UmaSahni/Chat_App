const express = require("express")
const cors = require('cors')
const colors = require('colors');
const { connect } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const app = express()
require('dotenv').config()

// & <--- Middlewares --->
app.use(express.json())
app.use(cors())
app.use("/auth", userRouter)



app.listen(process.env.PORT, async()=>{
    try {
        await connect
        console.log("Connected to mongoDB".bold.bgBrightMagenta)
    } catch (error) {
        console.log("Error in connecting to mongoDB".underline.red)
    }
    console.log(`${process.env.PORT} ---> running on port`.bgBlue)
})
