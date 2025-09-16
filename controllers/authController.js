const mongoose = require('mongoose');
const User = require("../models/Users")
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../services/auth')

const authController = {

    login: async (req,res)=>{
        const {email,password} = req.body;
            const user = await User.findOne({email,password});
            if(!user) {
                return res.render('login',{
                    message:"Invalid email or password"
                });
            }

            // const sessionId=uuidv4(); //it makes a unique id when the user logs in
            // console.log('setUser:', sessionId, user);

            //sending user to setUser service using middleware
            const token=setUser(user);
            res.cookie("uid",token);
            return res.redirect('/');
    },

    register: async(req,res) => {
        const {username, email, password} = req.body;
        try {
                const isUser = await User.findOne({email:email});
                if(isUser){ 
                    return res.json({message:"User already exists"});
                }
                const data = new User({
                    username:username,
                    email:email,
                    password:password
                });
                await data.save();
                if(!data) {
                    return res.json({message:"error all fields required"});
                }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Internal server error"});
        }
        return res.redirect('/');
    }

}


module.exports = authController;