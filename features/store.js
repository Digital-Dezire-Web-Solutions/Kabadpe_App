import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
// import vendorAuthSlice from "./vendorAuth/vendorAuthSlice";
import utilitySlice from "./utilitySlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    // vendorAuth: vendorAuthSlice,
    utility: utilitySlice,
  },
});
