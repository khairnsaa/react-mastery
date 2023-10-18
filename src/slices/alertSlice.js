import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { value: { type: null, detail: null } },
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
