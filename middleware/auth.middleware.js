const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
require('dotenv').config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({message:"please Login"})
    }
    if(blacklist.includes(token)){
        return res.status(400).json({message:"please Login again"})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({ msg: "Token not recognized" });
        }
        req.user = decoded;
        next()
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    auth
}