import { describe, expect, it } from "vitest";
import { store } from "../store";
import alertReducer, { setAlert } from "./alertSlice";

describe("alertSlice", () => {
  it("should set an alert", () => {
    const initialState = store.getState().alert;
    const action = setAlert({ type: "error", detail: "Something went wrong" });
    const newState = alertReducer(initialState, action);

    expect(newState).toEqual({
      value: { type: "error", detail: "Something went wrong" },
    });
  });

  it("should not modify state for an unknown action", () => {
    const initialState = store.getState().alert;
    const action = { type: "unknownActionType" };
    const newState = alertReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
