import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItems: {},
  },
  reducers: {
    insertCheckitems: (state, action) => {
      let { checklistId, data } = action.payload;
      state.checkItems[checklistId] = data;
    },
    addNewCheckitem: (state, action) => {
      let { checklistId, data } = action.payload;
      state.checkItems[checklistId].push(data);
    },
    deleteCheckitem: (state, action) => {
      let { checklistId, checkItemId } = action.payload;

      state.checkItems[checklistId] = state.checkItems[checklistId].filter(
        (checkItem) => checkItem.id != checkItemId
      );
    },
    updateCheckItem: (state, action) => {
      let { checklistId, checkItemId, latestState } = action.payload;

      state.checkItems[checklistId] = state.checkItems[checklistId].map(
        (checkItem) => {
          if (checkItem.id == checkItemId) {
            checkItem.state = latestState;
          }
          return checkItem;
        }
      );
    },
  },
});

export const {
  insertCheckitems,
  addNewCheckitem,
  deleteCheckitem,
  updateCheckItem,
} = checkItemSlice.actions;
export default checkItemSlice.reducer;
