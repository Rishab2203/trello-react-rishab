import { createSlice } from "@reduxjs/toolkit";
import { addNewList, fetchLists, archiveList } from "../AsyncThunks/thunks";

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    addList: false,
    newListName: "",
  },
  reducers: {
    setAddList: (state) => {
      state.addList = !state.addList;
      state.newListName = "";
    },
    newList: (state, action) => {
      state.newListName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(archiveList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id != action.payload);
      });
  },
});

export const { setAddList, newList } = listSlice.actions;
export default listSlice.reducer;
