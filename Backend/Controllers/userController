const { validationResult } = require('express-validator');
const userModel=require('../models/userModel');
const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken');
const {promisify}=require('util');
const blacklistModel=require('../models/BlacklistModel');





exports.signup=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {name,email,password,country}=req.body;
    try{
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists!"});
        }
        const hashPassword=await userModel.hashPassword(password);
        const newUser=await userModel.create({
            name,
            email,
            password:hashPassword,
            country});
        const token=newUser.generateAuthToken();
        res.cookie('token',token);
        return res.status(201).json({
            status:"success",
            token,
            newUser
        });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message:"Invalid credentials!"});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials!"});
        }
        const token=user.generateAuthToken();
        res.cookie('token',token);
        return res.status(200).json({
            status:'success',
            token,
            user
        });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.profile=async(req,res)=>{
    const userId=req.user._id;
    try{
        const user=await userModel.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        return res.status(200).json({
            status:"success",
            newUser:user
        });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

exports.logout=async(req,res)=>{
    res.clearCookie('token');
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];
    await blacklistModel.create({token});
    return res.status(200).json({message:"Logged out successfully!"});
}
exports.auth=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized!"});
    }
    const isblacklistedToken=await blacklistModel.findOne({token});
    if(isblacklistedToken){
        return res.status(401).json({message:"Unauthorized!"});
    }
    let decoded;
    try{
         decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    }
    catch(err){
        if(err.name==="TokenExpiredError"){
            return res.status(401).json({message:"Token expired!"});
        }
        else if(err.name==="JsonWebTokenError"){
            return res.status(401).json({message:"Invalid token!"});
        }
        else{
            return res.status(500).json({error:err.message});
        }
    }
    const currentuser=await userModel.findById(decoded._id);
    if(!currentuser){
        return res.status(401).json({message:"Unauthorized!"});
    }
    req.user=currentuser;
    next();
};