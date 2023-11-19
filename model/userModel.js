import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    verificationStatus:{type:Boolean,default:false}
},
{timestamps:true})



export const UserModel=mongoose.model("User",userSchema)