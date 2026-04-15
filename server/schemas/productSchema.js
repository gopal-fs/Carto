import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    shop_id:{type:String,required:true},
    product_id:{type:String,required:true},
    image:{type:String,required:true},
    name:{type:String,required:true},
    sold_by:{type:String,required:true,enum:["pc","kg","ml"]},
    description:{type:String,required:true},
    features:{type:String,required:true},
    isAvailable:{type:Boolean,default:true}
},{timestamps:true});


const productModel= mongoose.models.products || mongoose.model("products",productSchema);
export default productModel