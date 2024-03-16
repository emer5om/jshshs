import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    banner: [],
    sections: [],
    categories: [],
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
        },
        setHomeCategories: (state, action) => {
            state.categories = action.payload
        }

    },
});


export const {setHomeBanner, setHomeSection,setHomeCategories} = branchSlice.actions;

export default branchSlice.reducer;


