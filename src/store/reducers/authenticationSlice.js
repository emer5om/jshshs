import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], // Initial language set to English
  isLogged: false,
  accessToken: "",
  userData: {}
};

const authenticationSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {

    setAuth: (state, action) => {
      state.accessToken = action.payload.token
      state.isLogged = !action.payload.error
      state.userData = action.payload.data

    },
    setLogout: (state, action) => {
      state.accessToken = initialState.accessToken
      state.isLogged = initialState.isLogged
      state.userData = initialState.userData
    }
  },
});

export const {   setAuth, setLogout} = authenticationSlice.actions;
export default authenticationSlice.reducer;
