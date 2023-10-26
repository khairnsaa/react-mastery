import { act, renderHook } from "@testing-library/react-hooks";
import "isomorphic-fetch";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../mock/mswSetup";
import { store } from "../store";
import { useGetLeaderboardQuery } from "./leaderboardApiSlice";

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
Wrapper.propTypes = {
  children: PropTypes.node,
};

describe("Integration Test user api slice", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("should fetch leaderboard data", async () => {
    const { result, waitFor } = renderHook(() => useGetLeaderboardQuery(), {
      wrapper: Wrapper,
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    // Access the hook's result
    const getLeaderboardResponse = result.current.data;

    // Assert the result
    expect(getLeaderboardResponse).toEqual([
      {
        user: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        score: 10,
      },
      {
        user: {
          id: "users-2",
          name: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        score: 5,
      },
    ]);
  });
});
