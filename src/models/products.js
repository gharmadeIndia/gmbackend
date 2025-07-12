const mongoose=require("mongoose")
const productSchema= mongoose.Schema({
name:{
    type:String,
    maxlength:50
},
price:{
    type:Number,
    min:0
},
category:{
    type:String,
    maxlength:50
},
description:{
    type:String,
    
},
images:[String],
seller:[String]

},
{
    timestamps:true
});
const Product=mongoose.model("Product",productSchema);
module.exports={
    Product
}