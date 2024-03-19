import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const userSettingsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setUserSettings: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserSettings } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
