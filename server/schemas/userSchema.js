import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    user_id:{type:String,unique:true,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    number:{type: String, required: true},
    location:{type:String,required:true},
    latitude:{type:Number},
    longitude:{type:Number},
    user_type:{type:String,required:true,enum:["user","shop","vendor","admin","delivery"]}
},{timestamps:true});


const userModel=mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;