import express from "express";
import { upload } from "../configs/multer.js";
import { shopRegister, getShop, getPendingShops, addProduct, getProducts, updateDiscount, updateAvailability, updateProduct, deleteProduct } from "../controllers/shopController.js";
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
shopRouter.post("/add-product",checkAuth,upload.single("productImage"),addProduct);
shopRouter.get("/products",checkAuth,getProducts);
shopRouter.patch("/products/:product_id/flash-sale",checkAuth,updateDiscount);
shopRouter.patch("/products/:product_id/availability",checkAuth,updateAvailability);
shopRouter.patch("/products/:product_id",checkAuth,upload.single("productImage"),updateProduct);
shopRouter.put("/delete-product",checkAuth,deleteProduct);


export default shopRouter;
