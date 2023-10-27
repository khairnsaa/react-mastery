import { render } from "@testing-library/react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import alertSlice from "../slices/alertSlice";
import { apiSlice } from "../slices/apiSlice";
import authSlice from "../slices/authSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        alert: alertSlice,
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
