/**
 * - auth reducer test
 *   - should return initial state if no one authenticated
 *   - should return user info if someone authenticated
 *   - should return null if someone logged out
 */

import { describe, expect, it } from "vitest";
import { store } from "../store";
import authReducer, { logout, setCredentials } from "./authSlice";

describe("auth reducer", () => {
  it("should return initialState if no one authenticated", () => {
    const initialState = store.getState().auth;
    expect(authReducer(initialState, { type: undefined })).toEqual({ userInfo: null });
  });
  it("should return user info if someone authenticated", () => {
    const initialState = store.getState().auth;
    const newState = authReducer(initialState, setCredentials("user-authentication-token"));
    expect(newState).toEqual({ userInfo: "user-authentication-token" });
  });
  it("should return null if someone logged out", () => {
    const prevState = { userInfo: "user-authentication-token" };

    const newState = authReducer(prevState, logout());
    expect(newState).toEqual({ userInfo: null });
  });
});
