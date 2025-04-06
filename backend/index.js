const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(cors());

// MOngoDB connection
mongoose.connect('mongodb://localhost:27017/EngineerGuide',{
}).then(()=>console.log('MongoDB connected'))


app.get('/',(req,res)=>{
    res.send('Hello World!')
}); 
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
});