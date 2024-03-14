import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

export const selectData = createSelector(
  (state) => state.settings,
  (settings) => settings.data
);
