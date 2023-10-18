import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./App.css";
import Router from "./Router";
import alertSlice from "./slices/alertSlice";
import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";

function App() {
  const store = configureStore({
    reducer: {
      alert: alertSlice,
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
