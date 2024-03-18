import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
};

const PageLoadingSlice = createSlice({
    name: "pageLoading",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading= action.payload
        },

    },
});

export const { setIsLoading } = PageLoadingSlice.actions;

export default PageLoadingSlice.reducer;


