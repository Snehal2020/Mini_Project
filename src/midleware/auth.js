const jwt=require("jsonwebtoken")
const collect = require("../models/schema")

const auth=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        const verifyuser=jwt.verify(token,"hello")
        const data=await collect.Regcol.findOne({_id:verifyuser._id})
        console.log(data)
        req.token=token;
        req.data=data;
        next();
    } catch (error) {
        res.render("login")
    }
}
module.exports=auth;