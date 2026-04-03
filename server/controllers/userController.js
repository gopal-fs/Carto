
import bcrypt from "bcrypt"
import userModel from "../schemas/userSchema.js";
import {v4 as uuid} from "uuid";
import { generateToekn } from "../utils/generateToken.js";
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

        const payload={user_id:user_id,email:email};

        const  tokenResult= generateToekn(payload);
        if(!tokenResult.success) return res.status(400).send({success:false,message:tokenResult.message});

        await createUser.save();

        res.cookie("token",tokenResult.message,{
            secure:true,
            httpOnly:true,
            sameSite:"Strict",
            maxAge:2592000
        })

        return res.status(201).send({success:true,message:"Register Successfull"});

        

    }
    catch(err){
        return res.status(500).send({success:false,message:"Unable to Register User"})
    }
}