const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../keys');
const mongoose = require('mongoose');
let user = require("./../models/user.model");
const users = mongoose.model("user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET,(err, payload)=>{
        if(err){
            return res.status(401).json({ error: "you must logged in" })
        }
        const { _id } = payload
        user.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}