const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { response } = require("express");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async(req,res)=>{
    try{
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch){
                const token = await user.generateToken();
                return res.status(200).json({status:"sucess",user,token});
            }
        }
        throw new Error("invalud email or password");
    }catch(error){
        res.status(400).json({status:"fail",error:error.message});
    }
}

authController.authenticate = async (req, res, next)=>{
    try{
        const tokenString = req.headers.authorization;
        if(!tokenString) throw new Error("Token not found");
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload)=>{
            if(error) throw new Error("invaild token");
            req.userId = payload._id;
        });
        next();
    }catch(error){
        res.status(400).json({status:"error", error:error.message});
    }
}

authController.checkAdminPermission = async (req, res, next)=>{
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if(user.level !== "admin") throw new Error("no permission");
        next();
    }catch(error){
        console.log(error);
        res.status(400).json({status:"falil", error:error.message});
    }
}

module.exports = authController;