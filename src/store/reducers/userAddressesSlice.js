import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
};

const userAddressesSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setUserAddresses: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserAddresses } = userAddressesSlice.actions;
export default userAddressesSlice.reducer;
