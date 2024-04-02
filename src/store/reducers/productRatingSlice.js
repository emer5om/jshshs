// productRatingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratings: {}, // You can define the initial state as needed
};

const productRatingSlice = createSlice({
  name: 'productRating',
  initialState,
  reducers: {
    // Define reducers for handling product ratings
    setProductRating(state, action) {
      const { productId, rating } = action.payload;
      state.ratings[productId] = rating;
    },
  },
});

export const { setProductRating } = productRatingSlice.actions;

export default productRatingSlice.reducer;
