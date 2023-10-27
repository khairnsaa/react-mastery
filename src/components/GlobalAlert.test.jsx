import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it } from "vitest";
import alertSlice, { setAlert } from "../slices/alertSlice";
import GlobalAlert from "./GlobalAlert";

describe("GlobalAlert component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        alert: alertSlice,
      },
    });
  });

  it("should render an alert with the provided content", () => {
    // Dispatch a sample alert action
    store.dispatch(setAlert({ type: "error", detail: "Sample Alert Message" }));

    render(
      <Provider store={store}>
        <GlobalAlert />
      </Provider>
    );

    // Assert that the Alert component is rendered
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeTruthy();

    // Assert that the content of the alert is as expected
    expect(alertElement.textContent).toBe("Sample Alert Message");
  });
});
