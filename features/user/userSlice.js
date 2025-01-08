import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "./userActions";
import { removeFromLocalStorage } from "../../lib/localStorage";

const initialState = {
  loading: undefined,
  userInfo: null,
  error: "",
  success: false,
};
const logoutAction = (state) => {
  removeFromLocalStorage("token");
  state.loading = false;
  state.userInfo = null;
  state.error = "";
  state.success = false;
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: logoutAction,
  },
  extraReducers: (builder) => {
    builder.addCase(userFetch.pending, (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.userInfo = null;
    });
    builder.addCase(userFetch.fulfilled, (state, { payload: { data } }) => {
      state.loading = false;
      state.userInfo = data;
      state.success = true;
    });
    builder.addCase(userFetch.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      state.userInfo = null;
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
