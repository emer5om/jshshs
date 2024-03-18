import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_quantity: 0,
    sub_total: 0,
    tax_percentage: 0,
    tax_amount: 0,
    overall_amount: 0,
    total_arr: 0,
    variant_id: [
    ],
    data: [

    ]
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.total_quantity= action.payload.total_quantity
                state.sub_total= action.payload.sub_total
                state.tax_percentage= action.payload.tax_percentage
                state.tax_amount= action.payload.tax_amount
                state.overall_amount= action.payload.overall_amount
                state.total_arr= action.payload.total_arr
                state.variant_id= action.payload.variant_id
                state.data= action.payload.data
        },

    },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;


