import { act, renderHook } from "@testing-library/react-hooks";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../mock/mswSetup";
import { store } from "../store";
import { useGetAllUsersQuery, useLoginMutation } from "./userApiSlice";

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
    expect(getAllUsersResponse).toEqual([
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
    ]);
  });
  it("should return token when user logged in", async () => {
    const { result, waitFor } = renderHook(() => useLoginMutation(), { wrapper: Wrapper });

    // Call the login mutation with a sample payload
    const login = result.current[0];
    const loginResponse = await login({ username: "testuser", password: "testpassword" });

    // Wait for the hook to finish its asynchronous operation

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
    });
    await waitFor(
      () => {
        return result.current[1].isSuccess;
      },
      { timeout: 5000 }
    );

    // Assert the result
    expect(loginResponse.data).toEqual({ token: "mockedToken" });
    expect(loginResponse.error).toBe(null);
    expect(loginResponse.isSuccess).toBe(true);
  });
});
