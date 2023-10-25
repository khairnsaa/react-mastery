import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
