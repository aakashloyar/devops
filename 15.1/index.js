const express=require('express')
const mongoose=require('mongoose')
require("dotenv").config(); // If using a .env file
const app=express();
const mongouri=process.env.MONGO_URL
app.get('/',(req,res)=>{
    res.send('Hello world is mine');
})
console.log(mongouri)
try{
    mongoose.connect(mongouri);
    console.log('connected to mongo successfully')
} catch {
    console.log('error while connecting to mongo')
}
app.listen(3000);