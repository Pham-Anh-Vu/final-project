import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import { baseAuthAPI } from "../../service/base-auth.api";
import { errorMiddleware } from "../../config/auth-middle-ware";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [baseAuthAPI.reducerPath]: baseAuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    baseAuthAPI.middleware,
    errorMiddleware
  )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;