import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    banner: null,
    update: false
};

const branchSlice = createSlice({
    name: "home",
    initialState,
    reducers: {

        setHomeBanner: (state, action) => {
            state.banner = action.payload
        },


    },
});




export const { setHomeBanner } = branchSlice.actions;

export default branchSlice.reducer;


