import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguage } = citiesSlice.actions;
export default citiesSlice.reducer;
