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
import WalletSlice from "@/store/reducers/walletSlice";
import favoritesSlice from "@/store/reducers/favoritesSlice";
import promoCodeSlice from "@/store/reducers/promoCodeSlice";
import userAddressesSlice from "@/store/reducers/userAddressesSlice";
import selectedDeliverySlice from "@/store/reducers/selectedDeliverySlice";
import userSettingsSlice from "@/store/reducers/userSettingsSlice";
import darkModeReducer from "@/store/reducers/darkModeSlice";
import rtlReducer from "@/store/reducers/rtlSlice";
import searchDrawerReducer from "@/store/reducers/searchDrawerSlice";

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
  pageLoading: PageLoadingSlice,
  wallet: WalletSlice,
  favorites: favoritesSlice,
  promoCode: promoCodeSlice,
  userAddresses: userAddressesSlice,
  selectedDeliveryAddress: selectedDeliverySlice,
  userSettings: userSettingsSlice,
  darkMode: darkModeReducer,
  rtl: rtlReducer,
  searchDrawer: searchDrawerReducer,
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
      immutableCheck: false,

    }),
  ],
});

export const persistor = persistStore(store);
