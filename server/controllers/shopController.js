import shopModel from "../schemas/shopSchema.js";
import { uploadToCloudinary } from "../configs/cloudinary.js";
import userModel from "../schemas/userSchema.js";
import {v4 as uuid} from "uuid";
export const shopRegister = async (req, res) => {
    try {
        const shop_id = req.payload?.user_id;
        if (!shop_id) {
            return res.status(401).send({ success: false, message: "Please login" });
        }

        const { shop_name, shop_type, shop_address } = req.body;
        const profile = req.files?.profile?.[0];
        const banners = req.files?.banners ?? [];

        if (!shop_name || !shop_type || !shop_address || !profile || banners.length < 3) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        const owner = await userModel.findOne(
            { user_id: shop_id },
            { email: 1, location: 1, number: 1 }
        );
        if (!owner) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const existing = await shopModel.findOne({ shop_id });
        if (existing) {
            return res.status(409).send({ success: false, message: "Shop already registered" });
        }

        const [profileUrl, image1, image2, image3] = await Promise.all([
            uploadToCloudinary(profile.buffer, "carto/shops/profile"),
            uploadToCloudinary(banners[0].buffer, "carto/shops/banners"),
            uploadToCloudinary(banners[1].buffer, "carto/shops/banners"),
            uploadToCloudinary(banners[2].buffer, "carto/shops/banners"),
        ]);

        const shop = await shopModel.create({
            shop_id,
            shop_name,
            shop_type,
            email: owner.email,
            number: owner.number,
            address: shop_address,
            location: owner.location,
            profile: profileUrl,
            image1,
            image2,
            image3,
        });

        return res.status(201).send({
            success: true,
            message: "Shop registered, awaiting admin approval",
            shopData: shop,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ success: false, message: "Failed to register shop" });
    }
};

export const getShop = async (req, res) => {
    try {
        const shop_id = req.payload?.user_id;
        if (!shop_id) {
            return res.status(401).send({ success: false, message: "Please login" });
        }

        const shop = await shopModel.findOne({ shop_id });

        if (!shop) {
            return res.status(200).send({
                success: true,
                message: "No shop registered",
                shopData: { isRegistered: false, isApproved: false },
            });
        }

        const owner = await userModel.findOne(
            { user_id: shop_id },
            { email: 1, number: 1, location: 1 }
        );

       

        const shopData = {
            ...shop.toObject(),
            number: owner?.number ?? shop.number ?? null,
            email: owner?.email ?? shop.email ?? null,
            location: owner?.location ?? shop.location ?? null,
        };

      

        return res.status(200).send({
            success: true,
            message: "Shop fetched",
            shopData,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ success: false, message: "Failed to fetch shop" });
    }
};


export const getPendingShops=async(req,res)=>{
    try{
        const shopsList=await shopModel.find({isRegistered:true,isApproved:false},{_id:0,shop_id:1,shop_name:1,email:1,shop_type:1,profile:1,location:1,createdAt:1});
        
        if(!shopsList)  return res.status(400).send({success:false,message:"No Shops Pending"});

        return res.status(200).send({success:true,message:"Shops Loaded Successfully",shopsList})

    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({success:false,message:"Failed to Fetch Shops"});
    }
}

export const addProduct=async(req,res)=>{
    try{
        
        const shop_id=req.payload.user_id;
        
        if(!shop_id) return res.status(400).send({success:false,message:"Please Login"});
      
        const productImage=req.file;
       
        console.log(productImage)
        const {name,description,pricing,keyFeatures,measurement}=req.body;

        console.log(name,description,pricing,keyFeatures,measurement)
        
        if(!productImage || !name || !description || !measurement || !pricing || !keyFeatures) return res.status(400).send({success:false,message:"All Fields Required"});
        
        const productImageUrl=await uploadToCloudinary(productImage.buffer,"carto/shop/products");
        const productData={
            product_id:uuid(),
            image:productImageUrl,
            name:name,
            sold_by:{
                category:measurement,
                prices:pricing
            },
            description:description,
            features:keyFeatures
        }
        const add=await shopModel.findOneAndUpdate({shop_id:shop_id},{
            $push:{
                products:productData
            }
        });

        return res.status(200).send({success:true,message:"Product Uploaded"});
    }
    catch(err){
        return res.status(500).send({success:false,message:"Failed to Add Product"});
    }
}


export const getProducts = async (req, res) => {
    try {
        const shop_id = req.payload?.user_id;
        if (!shop_id) {
            return res.status(401).send({ success: false, message: "Please login" });
        }

        const shop = await shopModel.findOne({ shop_id }, { products: 1 }).lean();
        if (!shop) {
            return res.status(404).send({ success: false, message: "Shop not found" });
        }

        return res.status(200).send({ success: true, products: shop.products ?? [] });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ success: false, message: "Failed to Fetch Products" });
    }
}

export const updateDiscount=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const {discount}=req.body;
        const shop_id=req.payload?.user_id;

        const updateProduct=await shopModel.findOneAndUpdate(
            {
               shop_id,
               "products.product_id": product_id
            },
            {
               $set:{
                  "products.$.discount": Number(discount)
               }
            },
            { new: true }
         );

        if(!updateProduct) return res.status(404).send({success:false,message:"Product not found"});

        return res.status(200).send({success:true,message:"Discount Updated"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({success:false,message:"Failed to Update Status"});
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const shop_id = req.payload?.user_id;
        if (!shop_id) return res.status(401).send({ success: false, message: "Please login" });

        const { name, description, features, pricing } = req.body;
        const productImage = req.file;

        const shop = await shopModel.findOne({ shop_id });
        if (!shop) return res.status(404).send({ success: false, message: "Shop not found" });

        const product = shop.products.find(p => p.product_id === product_id);
        if (!product) return res.status(404).send({ success: false, message: "Product not found" });

        if (name) product.name = name;
        if (description) product.description = description;
        if (features) product.features = features;

        if (productImage) {
            const url = await uploadToCloudinary(productImage.buffer, "carto/shop/products");
            product.image = url;
        }

        if (pricing) {
            const parsed = typeof pricing === "string" ? JSON.parse(pricing) : pricing;
            product.sold_by.prices.clear();
            for (const [k, v] of Object.entries(parsed)) {
                product.sold_by.prices.set(k, Number(v));
            }
        }

        await shop.save();

        const updated = shop.toObject({ flattenMaps: true }).products.find(
            p => p.product_id === product_id
        );

        return res.status(200).send({ success: true, message: "Product Updated", product: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ success: false, message: "Failed to Update Product" });
    }
};

export const updateAvailability=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const {isAvailable}=req.body;
        const shop_id=req.payload?.user_id;

        const updateProduct=await shopModel.findOneAndUpdate(
            {
               shop_id,
               "products.product_id": product_id
            },
            {
               $set:{
                  "products.$.isAvailable": isAvailable
               }
            },
            { new: true }
         );

        if(!updateProduct) return res.status(404).send({success:false,message:"Product not found"});

        return res.status(200).send({success:true,message:"Status Updated"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({success:false,message:"Failed to Update Status"});
;    }
}



export const deleteProduct=async(req,res)=>{
    try{
        const {product_id}=req.body;
        const shop_id=req.payload?.user_id;

        const deleteProduct=await shopModel.findOneAndUpdate({shop_id,"products.product_id":product_id},{
            $pull:{
                products:{
                    product_id:product_id
                }
            }
        },{new:true});

        if(!deleteProduct) return res.status(404).send({success:false,message:"Product Not Found"});

        return res.status(200).send({success:true,message:"Product Deleted Successfully"});
    }
    catch(err){
        return res.status(500).send({success:false,message:"Failed to Delete Product"});
    }
}