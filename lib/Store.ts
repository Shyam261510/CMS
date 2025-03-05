import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./dataSlice";
export const store = configureStore({
  reducer: { userSlice },
});
