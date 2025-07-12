const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
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
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
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
  const token = await jwt.sign({ _id: user._id }, "Dev2025");
  return token;
};
const User=mongoose.model("User",userSchema);
module.exports={
    User
}

