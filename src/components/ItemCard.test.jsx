/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { mockData } from "../mock/mockData";
import { store } from "../store";
import ItemCard from "./ItemCard";

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
Wrapper.propTypes = {
  children: PropTypes.node,
};

describe("LoginInput component", () => {
  it("should show item title correctly", async () => {
    // Arrange
    render(<ItemCard item={mockData.oneThread} />, {
      wrapper: Wrapper,
    });

    // Action

    // Assert
    const titleElement = screen.getByText(mockData.oneThread);
    expect(titleElement).toBeInTheDocument();
  });
});
