import express from "express"
import cors from "cors"
import { connectMongo } from "./configs/db.js"
import dotenv from "dotenv";
import { Server } from "socket.io";
import {createServer} from "http";
import userRouter from "./routes/userRouter.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app=express();

const server=createServer(app);

const io=new Server({cors:{
    origin: "http://localhost:5173", // your frontend
    credentials: true
}});

app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

io.on("connection",(socket)=>{
    console.log(socket.id);
})

app.get('/',checkAuth,(req,res)=>{
    res.send("Hi")
})




/* Route Definitions */
app.use('/user/api',userRouter);



await connectMongo();

server.listen(3000,()=>console.log(`Server Running on Port:3000`))