import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credit: [],
  debit: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setDebit: (state, action) => {
      state.debit = action.payload;
    },
    setCredit: (state, action) => {
      state.credit = action.payload;
    },
  },
});

export const { setCredit, setDebit } = walletSlice.actions;
export default walletSlice.reducer;
