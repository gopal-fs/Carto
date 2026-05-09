import express from "express";
import { upload } from "../configs/multer.js";
import { shopRegister, getShop, getPendingShops } from "../controllers/shopController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const shopRouter = express.Router();

shopRouter.post(
    "/register",
    checkAuth,
    upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "banners", maxCount: 3 },
    ]),
    shopRegister
);

shopRouter.get("/getShop", checkAuth, getShop);

shopRouter.get("/getPendingShops",getPendingShops);

export default shopRouter;
