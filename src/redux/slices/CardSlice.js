import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    selectedCard: null,
    checklists: {},
  },
  reducers: {
    selectCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    insertChecklists: (state, action) => {
      let cardId = state.selectedCard["id"];
      state.checklists[cardId] = action.payload;
    },
    addNewChecklist: (state, action) => {
      let cardId = state.selectedCard["id"];
      state.checklists[cardId].push(action.payload);
    },
    deleteChecklist: (state, action) => {
      let cardId = state.selectedCard["id"];

      state.checklists[cardId] = state.checklists[cardId].filter(
        (checklist) => checklist.id != action.payload
      );
    },
  },
});

export const {
  selectCard,
  addNewChecklist,
  deleteChecklist,
  insertChecklists,
} = cardSlice.actions;
export default cardSlice.reducer;
