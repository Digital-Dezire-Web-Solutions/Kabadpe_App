import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  utilities: {},
};
const addutility = (state, action) => {
  const { name, value } = action.payload || {};
  state.utilities = { ...state.utilities, [name]: value };
};
const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    addutilityAction: addutility,
  },
});
export const { addutilityAction } = utilitySlice.actions;
export default utilitySlice.reducer;
