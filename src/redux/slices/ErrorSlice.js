import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
