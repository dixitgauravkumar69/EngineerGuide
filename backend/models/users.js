const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
   semster:{
        type:Number,
        required:true
   }
})
const User=mongoose.model('User',userSchema);
module.exports=User;