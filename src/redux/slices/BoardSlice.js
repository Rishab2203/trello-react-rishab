import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewBoard, getAllBoardsApi } from "../../services/utils";

export const fetchBoards = createAsyncThunk("fetchBoards", async () => {
  const response = await getAllBoardsApi();
  return response;
});

export const addBoard = createAsyncThunk("addBoard", async (boardName) => {
  const response = await addNewBoard(boardName);
  return response;
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = [...action.payload];
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default boardSlice.reducer;
