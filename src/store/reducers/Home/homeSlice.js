import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    banner: [],
    sections: [],
    update: false
};

const branchSlice = createSlice({
    name: "home",
    initialState,
    reducers: {

        setHomeBanner: (state, action) => {
            state.banner = action.payload
        },
        setHomeSection: (state, action) => {
            state.sections = action.payload
        }

    },
});


export const {setHomeBanner, setHomeSection} = branchSlice.actions;

export default branchSlice.reducer;


