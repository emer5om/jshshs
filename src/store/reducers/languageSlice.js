import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "en", // Initial language set to English
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

const getLanguages = () => {

}

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;