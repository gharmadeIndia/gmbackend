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
            console.log("inside if")
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

module.exports={authRouter}



// http://localhost:3000/v1/signup