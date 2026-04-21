
import express from "express";
import { getUser, Login, Register } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/login',Login);
userRouter.get('/getUser',getUser);
export default userRouter;