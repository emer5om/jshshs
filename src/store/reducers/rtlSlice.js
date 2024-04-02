// rtlSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRTL: false,
};

const rtlSlice = createSlice({
  name: 'rtl',
  initialState,
  reducers: {
    toggleRTL: (state) => {
      state.isRTL = !state.isRTL;
    },
  },
});

export const { toggleRTL } = rtlSlice.actions;

export default rtlSlice.reducer;
