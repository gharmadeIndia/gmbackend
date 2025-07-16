const express = require('express');
const connectdb=require("./Database/database")
const app=express();
const {authRouter}= require("./routes/authRoute");
require('dotenv').config()
const PORT=3000
connectdb().then(()=>{
      console.log("Database Connected")
    app.listen(PORT,()=>{
    console.log('Server running');
})
}  
).catch((err)=>{
    console.log("something went wrong"+err.message);
})
    


app.use(cors());
app.use(express.json());
app.use('/',authRouter)

