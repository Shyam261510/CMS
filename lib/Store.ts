import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userDatReducer from "./dataSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData", "organization", "allUsers", "team", "leaves"], // Only persist these states
};

const rootReducer = combineReducers({
  userSlice: persistReducer(persistConfig, userDatReducer), // Persist user slice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
