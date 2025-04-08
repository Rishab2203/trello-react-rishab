import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../slices/BoardSlice";
import loadReducer from "../slices/LoadingSlice";
import errorReducer from "../slices/ErrorSlice";
import listReducer from "../slices/ListSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    loading: loadReducer,
    error: errorReducer,
    list: listReducer,
  },
});

export default store;
