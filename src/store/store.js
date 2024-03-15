import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Import your reducer(s) here
import counterReducer from "./reducers/counterSlice";
import languageReducer from "./reducers/languageSlice";
import categoryReducer from "./reducers/categorySlice";
import settingsReducer from "./reducers/settingsSlice";
import authReducer from "./reducers/authenticationSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"], // Specify the parts of the state you want to persist
};

const persistedReducer = persistReducer(persistConfig, counterReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);
const persistedAuthenticationReducer = persistReducer(
  persistConfig,
  authReducer
);

const store = configureStore({
  reducer: {
    counter: persistedReducer,
    language: persistedLanguageReducer,
    categories: persistedCategoryReducer,
    settings: persistedSettingsReducer,
    authentication: persistedAuthenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
