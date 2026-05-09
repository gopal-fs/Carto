import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginUser, logoutUser, registerUser } from "./user";


const backend_url = import.meta.env.VITE_BACKEND_URL + '/shop';

type initialShopState = {
    shop_id: null | string,
    shop_name: null | string,
    image1: null | string,
    image2: null | string,
    image3: null | string,
    profile: null | string,
    shop_type: null | string,
    isRegistered: boolean,
    isApproved: boolean,
    address: null | string,
    location: null | string,
    email: null | string,
    number: null | string,
    status: string,
    rating: number,
    revenue: number,
    coupons: {
        coupon_id: string,
        name: string,
        discount: number,
        isActive: boolean,
        created_at: Date
    }[],
    products: {
        product_id: string,
        image: string,
        name: string,
        sold_by: string,
        description: string,
        features: string,
        isAvailable: boolean
    }[],
    orders: [],
    error: string,
    loading: boolean,
    hydrated: boolean
}

const initialState: initialShopState = {
    shop_id: null,
    shop_name: null,
    image1: null,
    image2: null,
    image3: null,
    profile: null,
    shop_type: null,
    isRegistered: false,
    isApproved: false,
    address: null,
    location: null,
    email: null,
    number: null,
    status: "open",
    rating: 4,
    revenue: 0,
    coupons: [],
    products: [],
    orders: [],
    error: "",
    loading: false,
    hydrated: false
}

type shopResponse = {
    success: boolean,
    message: string,
    shopData?: Partial<initialShopState>
}

const applyShopData = (state: initialShopState, data?: Partial<initialShopState>) => {
    if (!data) return;
    state.shop_id = data.shop_id ?? null;
    state.shop_name = data.shop_name ?? null;
    state.profile = data.profile ?? null;
    state.image1 = data.image1 ?? null;
    state.image2 = data.image2 ?? null;
    state.image3 = data.image3 ?? null;
    state.shop_type = data.shop_type ?? null;
    state.address = data.address ?? null;
    state.location = data.location ?? null;
    state.email = data.email ?? null;
    state.number = data.number ?? null;
    state.isRegistered = data.isRegistered ?? false;
    state.isApproved = data.isApproved ?? false;
    state.status = data.status ?? "open";
    state.rating = data.rating ?? 4;
    state.revenue = data.revenue ?? 0;
    state.coupons = data.coupons ?? [];
    state.products = data.products ?? [];
};

export const shopRegister = createAsyncThunk<shopResponse, FormData, { rejectValue: string }>(
    "shop/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${backend_url}/register`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Failed To Register Shop");
            }
            return rejectWithValue("Failed To Register Shop");
        }
    }
)

export const fetchShop = createAsyncThunk<shopResponse, void, { rejectValue: string }>(
    "shop/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${backend_url}/getShop`, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Failed to fetch shop");
            }
            return rejectWithValue("Failed to fetch shop");
        }
    }
);

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: (state, action: PayloadAction<Partial<initialShopState>>) => {
            Object.assign(state, action.payload);
        },
        resetShop: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(shopRegister.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(shopRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                applyShopData(state, action.payload.shopData);
                state.hydrated = true;
            })
            .addCase(shopRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed To Register";
            })
            .addCase(fetchShop.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchShop.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                applyShopData(state, action.payload.shopData);
                state.hydrated = true;
            })
            .addCase(fetchShop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch shop";
                state.hydrated = true;
            })
            .addCase(logoutUser.fulfilled, () => initialState)
            .addCase(LoginUser.fulfilled, () => initialState)
            .addCase(registerUser.fulfilled, () => initialState);
    }
});

export const { setShop, resetShop } = shopSlice.actions;
export default shopSlice.reducer;
