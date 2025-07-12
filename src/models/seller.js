const mongoose=require("mongoose")
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

const Seller= mongoose.model("Seller",sellerSchema)
module.exports={
    Seller
};


