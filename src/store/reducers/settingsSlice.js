import { createSlice, createSelector } from "@reduxjs/toolkit";
import { get_settings } from "@/interceptor/routes";
import { store } from "../store";

const initialState = {
  value: null,
  fetched: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.fetched = true;
      state.value = action.payload;
    },
  },
});

export const getSettings = () => {
  const settings = store.getState();
  if (settings.settings.value == null) {
    Promise.all([
      get_settings(),
      get_settings({ type: 'payment_method' })
    ]).then(([settingsRes, paymentMethodRes]) => {
      const settingsData = settingsRes.data;
      const paymentMethodData = paymentMethodRes.data;

      // Merge old data with new data from both API calls
      const mergedData = {
        ...settings.settings.value, // Existing data
        ...settingsData,
        paymentMethod: paymentMethodData // New data from the second API call
      };

      // Dispatch action to set merged data
      store.dispatch(setSettings(mergedData));
    });
  }
};


export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectData = createSelector(
  (state) => state.settings,
  (settings) => settings.data
);
