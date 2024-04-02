import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const selectedDeliverySlice = createSlice({
  name: "delivery_address",
  initialState,
  reducers: {
    setDeliveryAddress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDeliveryAddress } = selectedDeliverySlice.actions;
export default selectedDeliverySlice.reducer;
