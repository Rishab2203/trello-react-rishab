import { createSlice } from "@reduxjs/toolkit";

import { fetchBoards, addBoard } from "../AsyncThunks/thunks";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = [...action.payload];
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default boardSlice.reducer;
