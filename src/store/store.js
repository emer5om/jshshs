import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import settingsSlice from "../store/reducers/settingsSlice"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  settings: settingsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

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
    ...getDefaultMiddleware(
        {
          serializableCheck: false
        }
    ),
  ],
});

export const persistor = persistStore(store)