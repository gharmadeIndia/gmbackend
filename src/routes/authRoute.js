const express =  require("express");
const authRouter=express.Router();
const {User}= require("../models/user")
const {Seller} = require("../models/seller")
const bcrypt=require("bcrypt")
authRouter.post("/v1/signup",async(req,res)=>{
    try{
        let {uid,email,password,name,phoneNumber,isSeller }=req.body;
        const saltRound=10;
        const hashedPassword= await bcrypt.hash(password,saltRound);
        let savedUser
        if(isSeller) {
           
            savedUser=await Seller({
                name,
                uid,
                password:hashedPassword,
                phoneNumber,
                email
            }).save();
           


        }
        else    {
            
                savedUser=await User({
                name,
                uid,
                password:hashedPassword,
                phoneNumber,
                email
                }).save();
            }
             const token=await savedUser.getJWT();
            res.cookie("token",token);
    
        res.json(
            {
                message:"saved user Sucessfully", 
                 data:savedUser
                }
           
        );
       


    }catch(err){
        res.status(400).send("Error :"+err.message);
    }
})
authRouter.post('/v1/login',async(req,res)=>{
    try{
        let {isSeller,email,password}=req.body;
        let user;
        if(isSeller){
            user=await Seller.findOne({email:email});
            if(!user){
                throw new Error("User not Found");
            }
            const isPasswordCorrect=await user.validatePassword(password)
            if(isPasswordCorrect){
                const token=await user.getJWT();
                res.cookie("token",token);
                res.json({
                    message:"Login Successfull",
                    data:user
                })
            }
            else{
                throw new Error("Invalid Creds");
            }
             
        }
        else {
            user=await User.findOne({email:email});
            if(!user){
                throw new Error("User not Found");
            }
            const isPasswordCorrect=await user.validatePassword(password);
            if(isPasswordCorrect){
                const token = await user.getJWT();
                res.cookie("token",token);
                res.json({
                    message:"Login Successfull",
                    data:user
                });
            }
            else{
                throw new Error("Invalid Creds");
            }
        }
    }catch(err){
        res.status(400).send("Error :"+err.message);

    }
})

module.exports={authRouter}



// http://localhost:3000/v1/signup