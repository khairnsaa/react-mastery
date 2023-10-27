import { act, renderHook } from "@testing-library/react-hooks";
import "isomorphic-fetch";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { mockData } from "../mock/mockData";
import { server } from "../mock/mswSetup";
import { store } from "../store";
import { useGetAllThreadsQuery } from "./threadsApiSlice";

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
  it("should fetch all threads", async () => {
    const { result, waitFor } = renderHook(() => useGetAllThreadsQuery(), {
      wrapper: Wrapper,
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    // Access the hook's result
    const getAllThreadsResponse = result.current.data;

    // Assert the result
    expect(getAllThreadsResponse).toEqual(mockData.threads);
  });
  // it("should fetch one thread", async () => {
  //   const threadId = "thread-1"; // Replace with a valid thread id
  //   const { result, waitFor } = renderHook(() => useGetDetailThreadQuery(threadId), {
  //     wrapper: Wrapper,
  //   });
  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick
  //   });
  //   await waitFor(() => {
  //     return result.current.isSuccess;
  //   });

  //   // Access the hook's result
  //   const getThreadResponse = result.current.data;

  //   // Assert the result
  //   expect(getThreadResponse).toEqual(mockData.oneThread);
  // });
});
