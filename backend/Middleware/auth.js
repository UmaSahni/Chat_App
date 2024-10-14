require('dotenv').config()
const jwt = require('jsonwebtoken');


const auth = async(req, res, next) =>{
    let token = req.headers.authorization
    try {
        if(token){
            token = token.split(" ")[1]
            var decoded = jwt.verify(token, process.env.SECRECT_KEY);
            // console.log(decoded, "I am in middleware") // { user: '667a7fa9e2e0810b78d993e3', iat: 1719304389 }
            req.user = decoded.userID
            next()
        }
        else{
            res.send({"msg":"Token Not Found"})
        }
    } catch (error) {
        res.status(500).json({ message: "Auth Middleware Error" });
    }
}

module.exports = {auth}