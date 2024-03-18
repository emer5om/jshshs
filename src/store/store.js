import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import settingsSlice from "@/store/reducers/settingsSlice";
import languageSlice from "@/store/reducers/languageSlice";
import authenticationSlice from "@/store/reducers/authenticationSlice";
import branchSlice from "@/store/reducers/branchSlice";
import homeSlice from "@/store/reducers/Home/homeSlice";
import selectedMapAddressSlice from "@/store/reducers/selectedMapAddressSlice";
import cartSlice from "@/store/reducers/cartSlice";
import PageLoadingSlice from "@/store/reducers/pageLoadingSlice";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  settings: settingsSlice,
  language: languageSlice,
  authentication: authenticationSlice,
  branch: branchSlice,
  homepage: homeSlice,
  selectedCity: selectedMapAddressSlice,
  cart: cartSlice,
  pageLoading: PageLoadingSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         })
// })

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export const persistor = persistStore(store);
