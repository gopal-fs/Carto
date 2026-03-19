import mongoose from "mongoose";



const shopSchema=new mongoose.Schema({
    shop_id:{type:String,required:true},
    image1:{type:String,required:true},
    image2:{type:String,required:true},
    image3:{type:String,required:true},
    profilePic:{type:String,required:true},
    shop_type:{type:String,required:true},
    location:{type:String,required:true},
    status:{type:String,default:'open',enum:["open","closed"]},
    rating:{type:Number,default:4},
    number:{type:String,required:true},
    email:{type:String,required:true,lowercase: true,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    coupons:[{
        coupon_id:{type:String,required:true},
        name:{type:String,required:true},
        discount:{type:Number,required:true},
        isActive:{type:Boolean,required:true}
    }]
},{timestamps:true});

const shopModel= mongoose.models.shops || mongoose.model("shops",shopSchema);
export default shopSchema;