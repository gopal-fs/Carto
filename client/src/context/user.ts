import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type AuthState = {
  user_id: string | null;
  email: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user_type:string
};

type LoginResponse = {
  success: boolean;
  message: string;
  userPayload: {
    user_id: string;
    email: string;
    user_type:string
  };
};

type registerResponse={
  success: boolean;
  message: string;
  userPayload: {
    user_id: string;
    email: string;
    user_type:string;
  };
}


const initialState: AuthState = {
  user_id: null,
  email: "",
  loading: false,
  error: null,
  isAuthenticated: false,
  user_type:""
};

type logoutResponse={
  success:boolean,
  message:string
}


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

export const logoutUser=createAsyncThunk<logoutResponse,void,{rejectValue:string}>(
  "user/logout",
  async(_,{rejectWithValue})=>{
    try{
      const res=await axios.get(`${backend_url}/logout`,{
        withCredentials:true,
      });
      toast.success("Logout Successfull");
      return res.data;
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Logout Failed"
        );
      }
      return rejectWithValue("Logout Failed");
    }
  }

)


const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: { user_id: string; email: string; user_type: string } }) => {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.user_type = action.payload.user_type;
      state.isAuthenticated = true;
      state.error = null;
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
        state.user_type=action.payload.userPayload.user_type;
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
        state.email=action.payload.userPayload.email;
        state.user_type=action.payload.userPayload.user_type;
        state.isAuthenticated=true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled,(state)=>{
        state.user_id = null;
        state.email = "";
        state.user_type = "";
        state.isAuthenticated = false;
      })
  },

  
});

export const {  setUser } = userSlice.actions;
export default userSlice.reducer;