require('dotenv').config()
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const sha256 = require("js-sha256");
const asynchHandler = require("express-async-handler");

const getUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}
const register =async (req,res)=> {
    if(!req.body.name||!req.body.email||!req.body.password){
        res.status(400).json({message: "Please enter all fields"});
    }
    // check if already exists
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
            res.status(400).json({message: "email already exists"});}
        else{
                // hash the password
                const passowrdHashed = await sha256(req.body.password);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: passowrdHashed
                })
                    const newUser = await user.save();
                const token = await jwt.sign({
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                },process.env.JWT_SECRET,{expiresIn: "1h"});
                res.json({newUser,token: token});
            }
    }catch (err){
        res.status(500).json({message: "err.message"});
    }



}

const logIn =  async (req,res)=>{
    if(!req.body.name ||! req.body.password){
        res.status(400).json({message: "Please enter name and passowrd"});
    }
    try{
        const nameExists = await User.findOne({name: req.body.name});

        const hashedpassword = await sha256(req.body.password);

        const passwordExists = await User.findOne({password:hashedpassword});

        if(nameExists && passwordExists){
            const token = await jwt.sign({
                id: nameExists._id,
                name: nameExists.name,
                email: nameExists.email
            },process.env.JWT_SECRET,{expiresIn: "1h"});
            res.json({message: "success",token: token});
        }else{
            res.status(400).json({message: "Invalid name or password"});
        }
    }catch(err){
        res.status(500).json({message: "err.message"});
    }

}
const deleteUser =async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const updateUser =async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}




const getMe =async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    }catch (err) {
        res.status(500).json({message: "no user"});
    }
}

module.exports = {
    getUsers,
    register,
    deleteUser,
    updateUser,
    getMe,
    logIn
}
