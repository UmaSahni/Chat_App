const express = require("express")
const { UserModel } = require("../Models/user.Model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router()
require('dotenv').config()

//& <-- Signup Routes --->
userRouter.post("/signup", async(req, res)=>{
    const {name, password, email, pic} = req.body
    console.log(name, password, email)
    try {
      
        if(!name || !password || !email) return res.status(400).json({msg:"Unable to create account. Missging information Error"})
       
        //^ Check if user is already present in database
        const uniqueEmail = await UserModel.findOne({email})
        if(uniqueEmail) return res.json({msg:"User already exits. Please Login !"})
        
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            if(hash){
                const newUser = new UserModel({ name, password:hash, pic, email })
                await newUser.save()
                res.status(201).json({ msg: "Registeration Successful" })
            }
        });


    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"})
    }
})

//& <-- Login Routes --->
userRouter.post("/login", async(req, res) => {
    const {email, password} = req.body
    try {
        console.log(email, password)
        if (!email || !password) return res.status(400).json({ msg: "Unable to Login. Missging information Error" })

        const user = await UserModel.findOne({email})
        if (!user) return res.json({ msg: "User Not Found. Please Register !" })

        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function (err, result) {
            if(result){
                const token = jwt.sign({ foo: 'bar' }, process.env.SECRECT_KEY);
                res.status(200).json({msg:"Login Successful", token})
            }
        });    
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = {userRouter}