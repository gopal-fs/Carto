import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type AuthState = {
  user_id: string | null;
  email: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

type LoginResponse = {
  success: boolean;
  message: string;
  userPayload: {
    user_id: string;
    email: string;
  };
};

type registerResponse={
  success: boolean;
  message: string;
  userPayload: {
    user_id: string;
    email: string;
  };
}


const initialState: AuthState = {
  user_id: null,
  email: "",
  loading: false,
  error: null,
  isAuthenticated: false,
};


const backend_url: string = import.meta.env.VITE_BACKEND_URL;

export const LoginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backend_url}/login`, data, {
        withCredentials: true,
      });
      return res.data;
    } 
    catch(err){
      if(axios.isAxiosError(err)){
        return rejectWithValue(
          err.response?.data?.message || "Login Failed"
        );
      }
    }
  }
);


export const registerUser=createAsyncThunk<registerResponse,{email:string,password:string,number:string,location:string,latitude:number | null,longitude:number | null,user_type:string},{rejectValue:string}>(
  "user/register",
  async(data,{rejectWithValue})=>{
    try{
      const res = await axios.post(`${backend_url}/register`, data, {
        withCredentials: true,
      });
      return res.data;
    }
    catch(err){
      if(axios.isAxiosError(err)){
        return rejectWithValue(
          err.response?.data?.message || "Registration Failed"
        );
      }
    }
  }
)


const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user_id = null;
      state.email = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.userPayload.user_id;
        state.email = action.payload.userPayload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending,(state)=>{
        state.loading=true;
        state.user_id=null;

      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user_id=action.payload.userPayload.user_id;
        state.isAuthenticated=true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.isAuthenticated = false;
      })
  },

  
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;