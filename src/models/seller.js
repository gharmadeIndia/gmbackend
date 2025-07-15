const mongoose=require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()
const sellerSchema = new mongoose.Schema({
    uid:{
        type:String,
        require:true,
        unique:true

    },
    Name:{
        type:String,
        maxlength:50
    },
    phoneNumber:{
        
        type:Number,
        unique:true,
        required:true,
        minlength:10,
        maxlength:10,
        required:true
    },
    email:{
        unique:true,
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:8
    }
},{
    timestamps:true
});
sellerSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};
sellerSchema.methods.validatePassword = async function(password){
    const hashPassword =this.password;
    isPasswordValid= await bcrypt.compare(password,hashPassword);
    return isPasswordValid;
}

const Seller= mongoose.model("Seller",sellerSchema)
module.exports={
    Seller
};


