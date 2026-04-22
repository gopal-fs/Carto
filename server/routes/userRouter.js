import express from "express";
import { getUser, Login, logout, Register } from "../controllers/userController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/login',Login);
userRouter.get('/getUser',checkAuth,getUser);
userRouter.get('/logout',logout);

export default userRouter;