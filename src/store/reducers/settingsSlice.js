import { createSlice, createSelector } from "@reduxjs/toolkit";
import {get_settings} from "@/interceptor/routes";
import {store} from "../store"

const initialState = {
  value: null,
  fetched: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.fetched = true
      state.value = action.payload;
    },

  },
});


export const getSettings = () => {
  const settings = store.getState();
  if( settings.settings.value == null){
    get_settings().then(res => {
      // console.log(res.data)
      store.dispatch(setSettings(res.data))
    });
  }

}


export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectData = createSelector(
  (state) => state.settings,
  (settings) => settings.data
);


