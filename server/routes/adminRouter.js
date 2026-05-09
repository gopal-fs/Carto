

import express from "express"
import { updateShopStatus } from "../controllers/adminController.js";

const adminRouter=express.Router();


adminRouter.patch("/updateShopStatus",updateShopStatus);
export default adminRouter;