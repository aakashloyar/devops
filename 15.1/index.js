const express=require('express')
const mongoose=require('mongoose')
const app=express();
const mongouri="mongodb://mongo:27017/mydatabase"
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