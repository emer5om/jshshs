import { createSlice, createSelector } from "@reduxjs/toolkit";
import {get_settings} from "@/interceptor/routes";
import {store} from "../store"
import {onBranchIdChange} from "@/events/events";

const initialState = {
    id: 0,
};

const branchSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setBranchId: (state, action) => {

            state.id = action.payload;
          
        },


    },
});




export const { setBranchId } = branchSlice.actions;

export default branchSlice.reducer;


