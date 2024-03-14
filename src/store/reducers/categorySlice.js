import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
