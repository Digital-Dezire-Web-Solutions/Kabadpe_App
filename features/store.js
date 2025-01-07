import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
// import vendorAuthSlice from "./vendorAuth/vendorAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    // vendorAuth: vendorAuthSlice,
  },
});