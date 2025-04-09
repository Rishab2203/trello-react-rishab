import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    selectedCard: null,
    checklists: {},
    cards: {},
  },
  reducers: {
    insertCards: (state, action) => {
      const { listId, data } = action.payload;
      state.cards[listId] = data;
    },
    addNewCard: (state, action) => {
      const { listId, data } = action.payload;
      state.cards[listId].push(data);
    },
    deleteCard: (state, action) => {
      const { listId, cardId } = action.payload;

      state.cards[listId] = state.cards[listId].filter(
        (card) => card.id != cardId
      );
    },
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
  insertCards,
  addNewCard,
  deleteCard,
} = cardSlice.actions;
export default cardSlice.reducer;
