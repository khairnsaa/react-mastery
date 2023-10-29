import { act, renderHook } from "@testing-library/react-hooks";
import "isomorphic-fetch";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { mockData } from "../mock/mockData";
import { server } from "../mock/mswSetup";
import { store } from "../store";
import { useGetAllUsersQuery } from "./userApiSlice";

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

// Mock the response for the API request
const mockApiResponse = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
];

globalThis.fetch = async () => {
  return {
    status: 200,
    json: async () => mockApiResponse,
  };
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

describe("Integration Test user api slice", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("should fetch all users data", async () => {
    const { result, waitFor } = renderHook(() => useGetAllUsersQuery(), {
      wrapper: Wrapper,
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    // Access the hook's result
    const getAllUsersResponse = result.current.data;

    // Assert the result
    expect(getAllUsersResponse).toEqual(mockData.users);
  });
});
