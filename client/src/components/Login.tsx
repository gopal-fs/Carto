import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { LoginUser } from '../context/user';
import type { AppDispatch } from '../context/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [checked,setChecked]=useState<boolean>(false);
    const dispatch=useDispatch<AppDispatch>();
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const navigate=useNavigate();
    

    const handleLogin=async(e:React.FormEvent)=>{
        e.preventDefault();
        const result=await dispatch(LoginUser({email,password}));
        console.log(result)
        if(LoginUser.fulfilled.match(result)){
            toast.success("Login Successfull")
            return navigate('/user/dashboard');
        }
        else{
            const error:string | undefined=result.payload;
            return toast.error(error ?? "Login Failed");
        }
        
    }

  return (
    <form onSubmit={handleLogin}  className="flex flex-col mt-3 gap-5" >
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required className="flex-1 px-3 outline-0 py-2 border-1 border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]" placeholder="Enter your email..." />
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required className="flex-1 px-3 outline-0 py-2 border-1 border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]" placeholder="Enter your password..." />

                        <div className="flex gap-1 items-center">
                            <input onChange={() => setChecked(prev => !prev)} className="h-3 w-7" type="checkbox" required />
                            <p className={`text-sm  ${checked === true ? 'text-[#151312]' : 'text-gray-400'}`}>Agree to the terms of use & privacy policy.</p>
                        </div>

                        <div className="w-full flex justify-center">
                            <button className="bg-[#6366f1] hover:bg-[#585cf0] mt-1 text-white h-[40px] w-[200px] rounded-full cursor-pointer">Login Now</button>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <hr className="w-30 border-gray-300" />
                            <span className="text-gray-400 text-xs font-medium">OR</span>
                            <hr className="w-30 border-gray-300" />
                        </div>

                        <div className="flex justify-center">
                            <button className="flex items-center justify-center gap-2 rounded-full cursor-pointer
    bg-[#6366f1] hover:bg-[#585cf0] 
    text-white text-sm font-medium 
    h-[40px] px-5  shadow-sm">

                                <img src="/google.png" className="h-[18px] w-[18px]" alt="google" />
                                Continue with Google
                            </button>
                        </div>
                    </form>
  )
}

export default Login