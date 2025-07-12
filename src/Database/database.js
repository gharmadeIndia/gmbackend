const mongoose=require("mongoose")
require('dotenv').config();
const mongoURI=process.env.CONNECTION_STRING
connectdb=async()=>{
    const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));
}
module.exports=connectdb