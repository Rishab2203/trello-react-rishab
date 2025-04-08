import { createSlice } from "@reduxjs/toolkit";

const laodingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = laodingSlice.actions;
export default laodingSlice.reducer;
