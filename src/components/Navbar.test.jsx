import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { store } from "../store";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("Navbar renders with logo", () => {
    render(<Navbar />, { wrapper: Wrapper });
    const logoElement = screen.getByAltText("logo heap overflow");
    expect(logoElement).toBeTruthy();
  });
  it("Navbar renders login and register buttons when user is not authenticated", () => {
    render(<Navbar />, { wrapper: Wrapper });
    const loginButton = screen.getAllByText("Login");
    const registerButton = screen.getAllByText("Register");
    expect(loginButton).toBeTruthy();
    expect(registerButton).toBeTruthy();
  });
  it("Navbar not render ask a question buttons when user is not authenticated", () => {
    render(<Navbar />, { wrapper: Wrapper });
    const questionBtn = screen.queryByText("Ask Question");
    expect(questionBtn).toBeFalsy();
  });
});

function Wrapper({ children }) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </Provider>
  );
}
Wrapper.propTypes = {
  children: PropTypes.node,
};
