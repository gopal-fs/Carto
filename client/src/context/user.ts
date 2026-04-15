import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ErrorResponse } from "react-router-dom";
type UserState = {
    user_id: string;
    email: string;
    password: string;
    number: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    user_type: string;
};

const userData:UserState={
    user_id: "",
    email: "",
    password: "",
    number: "",
    location: "",
    latitude: null,
    longitude: null,
    user_type: ""

}

interface LoginPayload {
    email: string;
    password: string;
  }
  
  interface ErrorResponse {
    message: string;
  }
  
  const Login = createAsyncThunk<
    any,                // success response type (later refine cheyyi)
    LoginPayload,       // input type
    { rejectValue: ErrorResponse } // 🔥 reject type
  >(
    "user/login",
    async (data, { rejectWithValue }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          return rejectWithValue(result); // 🔥 typed error
        }
  
        return result;
      } catch (err:any) {
        if(err.response?.data?.message){
            return rejectWithValue({ message: err.response?.data?.message ?? "Something Went Wrong"});
        }
      }
    }
  );
    


const userSlice= createSlice({
    name:"user",
    initialState:userData,
    reducers:{
        login:()=>{
            Login();
        },
        logout:()=>{
            console.log("Logout")
        }
    }

})

export default userSlice;