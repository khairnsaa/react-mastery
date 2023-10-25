import { expect, test } from "vitest";
import { useGetAllUsersQuery, useLoginMutation, useRegisterMutation } from "./userApiSlice";

// Mock the fetch function
globalThis.fetch = async (url, options) => {
  if (url.endsWith("/register") && options.method === "POST") {
    return {
      status: 200,
      json: async () => ({ id: 1, username: "testuser" }),
    };
  }
  if (url.endsWith("/login") && options.method === "POST") {
    return {
      status: 200,
      json: async () => ({ id: 1, username: "testuser" }),
    };
  }
  if (url.endsWith("/users") && options.method === "GET") {
    return {
      status: 200,
      json: async () => [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
      ],
    };
  }
};

test("Test the user API", async () => {
  // Make API requests
  const registerResponse = await useRegisterMutation({ username: "testuser" });
  const loginResponse = await useLoginMutation({ username: "testuser" });
  const getAllUsersResponse = await useGetAllUsersQuery();

  // Assert the API responses using expect
  expect(registerResponse).toEqual({ id: 1, username: "testuser" });
  expect(loginResponse).toEqual({ id: 1, username: "testuser" });
  expect(getAllUsersResponse).toEqual([
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
  ]);
});
