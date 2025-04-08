import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../slices/BoardSlice";
import loadReducer from "../slices/LoadingSlice";
import errorReducer from "../slices/ErrorSlice";
import listReducer from "../slices/ListSlice";
import cardReducer from "../slices/CardSlice";
import checkItemReducer from "../slices/CheckitemsSlice";
import { Check } from "lucide-react";

const store = configureStore({
  reducer: {
    board: boardReducer,
    loading: loadReducer,
    error: errorReducer,
    list: listReducer,
    card: cardReducer,
    checkItem: checkItemReducer,
  },
});

export default store;
