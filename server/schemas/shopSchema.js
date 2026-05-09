import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shop_id: { type: String, unique: true, required: true },
    shop_name: { type: String, required: true },
    shop_type: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    number: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    profile: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    isRegistered: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },
    status: { type: String, default: "open", enum: ["open", "closed"] },
    rating: { type: Number, default: 4 },
    revenue: { type: Number, default: 0 },
    coupons: [{
        coupon_id: { type: String, required: true },
        name: { type: String, required: true },
        discount: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now },
    }],
    products: [{
        product_id: { type: String, required: true },
        image: { type: String, required: true },
        name: { type: String, required: true },
        sold_by: { type: String, required: true, enum: ["pc", "kg", "ml"] },
        description: { type: String, required: true },
        features: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
    }],
    orders: { type: Array, default: [] },
}, { timestamps: true });

const shopModel = mongoose.models.shops || mongoose.model("shops", shopSchema);
export default shopModel;
