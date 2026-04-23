
import bcrypt from "bcrypt"
import userModel from "../schemas/userSchema.js";
import {v4 as uuid} from "uuid";
import { generateToken } from "../utils/generateToken.js";
import { registerValidator } from "../validators/registerValidator.js";

export const Register=async(req,res)=>{
    try{
        const {email,password,number,location,latitude,longitude,user_type}=req.body;

        const validatorResponse=registerValidator({email,password,number,location,latitude,longitude,user_type});
        if(!validatorResponse.success) return res.status(400).send(validatorResponse);
        

        const findUser=await userModel.findOne({email:email});
        if(findUser) return res.status(400).send({success:false,message:"User Already Exists"});

        const user_id=uuid();
        const hashedPassword= await bcrypt.hash(password,12);
        const createUser=await new userModel({user_id:user_id,email,password:hashedPassword,number,location,latitude,longitude,user_type})

        const payload={user_id:user_id,email:email,user_type:user_type};

        const  tokenResult= generateToken(payload);
        if(!tokenResult.success) return res.status(400).send({success:false,message:tokenResult.message});

        await createUser.save();
       
        res.cookie("token",tokenResult.message,{
            
            httpOnly:true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge:30 * 24 * 60 * 60 * 1000
        })

        return res.status(201).send({success:true,message:"Register Successfull",userPayload:payload});

        

    }
    catch(err){
        return res.status(500).send({success:false,message:"Unable to Register User"})
    }
}


export const Login=async(req,res)=>{
    try{
       
        const {email,password}=req.body;
        if(!email || !password) return res.status(400).send({ success: false, message: "All fields required" });

        const findUser=await userModel.findOne({email});
        
        if(!findUser) return res.status(400).send({success:false,message:"User Not Found"});

        const isPasswordMatched=await bcrypt.compare(password,findUser.password);
        if(!isPasswordMatched) return res.status(400).send({success:false,message:"Password Incorrect"});
        const payload={user_id:findUser.user_id,email:findUser.email,user_type:findUser.user_type};
        const tokenResult=generateToken(payload);
       
        if(!tokenResult.success) return res.status(400).send({success:false,message:tokenResult.message});
        res.cookie("token",tokenResult.message,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge:30 * 24 * 60 * 60 * 1000
        })

        

        return res.status(200).send({success:true,message:"Login Successfull",userPayload:payload});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({success:false,message:"Unable to Login User"});
    }

}


export const getUser = async (req, res) => {
    try {
      const userData = req.payload;
    
  
      if (!userData) {
        return res.status(401).send({
          success: false,
          message: "Please Login",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User authenticated",
        user: userData,
      });
  
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  };


  export const logout=async(req,res)=>{
    try{

      res.clearCookie("token",{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
       
      });

      res.setHeader("Clear-Site-Data", '"cache", "cookies", "storage"');

      return res.status(200).send({success:true,message:"Logout Successfull"});
    }
    catch(err){
      return res.status(500).send({success:false,message:"Unable to logout"});
    }
  }