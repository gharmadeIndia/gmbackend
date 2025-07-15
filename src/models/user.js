const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const userSchema= mongoose.Schema({
    uid:{
        type:String,
        rquired:true,
        unique:true
    },
    name:{
        type:String,
        maxlength:50
    },
    phoneNumber:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    email:{
        type:String,
        required:true,
        unique:true   
    },
    password:{
        type:String,
        required:true,
        min:8
    },


},{
    timestamps:true
});
userSchema.methods.getJWT = async function () {
  const user = this;
  
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.validatePassword = async function(password){
    const hashPassword =this.password;
    isPasswordValid= await bcrypt.compare(password,hashPassword);
    return isPasswordValid;
}
const User=mongoose.model("User",userSchema);
module.exports={
    User
}

