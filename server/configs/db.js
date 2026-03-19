import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectMongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connected')
    }
    catch(err){
        console.log(`DB Connection Error :${err.message}`)
        process.exit(1);
    }
}