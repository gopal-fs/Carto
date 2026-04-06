
import jwt from "jsonwebtoken";

export const generateToken=(payload)=>{
    try{
        const token=jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        return {success:true,message:token};
    }
    catch(err){
        console.log(err.message);
        return {success:false,message:"Unable to Generate Token"};
    }
}