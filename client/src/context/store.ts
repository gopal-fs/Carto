
import { shopSlice } from "./shop.ts";
import userSlice from "./user.ts";
import { configureStore } from "@reduxjs/toolkit";
const store= configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice.reducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;