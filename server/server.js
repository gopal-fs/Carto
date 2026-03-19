import express from "express"
import cors from "cors"
import { connectMongo } from "./configs/db.js"
import dotenv from "dotenv"
dotenv.config();



const app=express();
app.use(cors())


await connectMongo();

app.listen(3000,()=>console.log(`Server Running on Port:3000`))