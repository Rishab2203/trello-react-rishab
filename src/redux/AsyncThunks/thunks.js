import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../slices/LoadingSlice";
import { setError } from "../slices/ErrorSlice";
import {
  getAllBoardsApi,
  addNewBoard,
  getAllListsApi,
  createListInBoardApi,
  archiveListApi,
} from "../../services/utils";

export const fetchBoards = createAsyncThunk(
  "fetchBoards",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await getAllBoardsApi();
      return response.data;
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const addBoard = createAsyncThunk(
  "addBoard",
  async (boardName, { dispatch }) => {
    console.log(boardName);
    dispatch(startLoading());
    try {
      const response = await addNewBoard(boardName);
      return response.data;
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const fetchLists = createAsyncThunk(
  "fetchLists",
  async (boardID, { dispatch }) => {
    console.log(boardID);
    dispatch(startLoading());
    try {
      const response = await getAllListsApi(boardID);
      return response.data;
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const addNewList = createAsyncThunk(
  "addNewList",
  async ({ listName, boardID }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await createListInBoardApi(listName, boardID);
      return response.data;
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const archiveList = createAsyncThunk(
  "archiveList",
  async (listId, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await archiveListApi(listId);
      return listId;
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  }
);
