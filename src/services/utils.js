import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const API = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;

export const getAllBoardsApi = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}members/me/boards?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding board", err.message);
  }
};

export const addNewBoard = async (boardName) => {
  try {
    const response = await axios.post(
      `${baseUrl}boards?name=${boardName}&prefs_background=blue&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding board", err.message);
  }
};

export const getAllListsApi = async (boardID) => {
  try {
    const response = await axios.get(
      `${baseUrl}boards/${boardID}/lists?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error getting list", err.message);
  }
};

export const getCardsInListApi = async (listId) => {
  try {
    const response = await axios.get(
      `${baseUrl}lists/${listId}/cards?key=${API}&token=${token}`
    );
    return response.data;
  } catch (err) {
    console.log("Error getting cards", err.message);
  }
};

export const createCardInListApi = async (cardName, listId) => {
  try {
    const response = await axios.post(
      `${baseUrl}cards?name=${cardName}&idList=${listId}&key=${API}&token=${token}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("Error adding card in list", err.message);
  }
};

export const createListInBoardApi = async (listName, boardId) => {
  try {
    const response = await axios.post(
      `${baseUrl}boards/${boardId}/lists?name=${listName}&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding list in board", err.message);
  }
};

export const archiveListApi = async (listId) => {
  try {
    const response = await axios.put(
      `${baseUrl}lists/${listId}/closed?value=true&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error archieving list in board", err.message);
  }
};

export const deleteCardApi = async (cardId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}cards/${cardId}?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error archieving list in board", err.message);
  }
};

export const getCheckListsApi = async (cardId) => {
  try {
    const response = await axios.get(
      `${baseUrl}cards/${cardId}/checklists?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error getting checklist in list", err.message);
  }
};

export const addCheckListApi = async (cardId, checkListName) => {
  try {
    const response = await axios.post(
      `${baseUrl}cards/${cardId}/checklists?name=${checkListName}&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checklist in list", err.message);
  }
};

export const addCheckItemApi = async (checkListId, checkItemName) => {
  try {
    const response = await axios.post(
      `${baseUrl}checklists/${checkListId}/checkItems?name=${checkItemName}&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const getCheckItemsApi = async (checkListId) => {
  try {
    const response = await axios.get(
      `${baseUrl}checklists/${checkListId}/checkItems?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const deleteCheckItemApi = async (checkListId, checkItemId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}checklists/${checkListId}/checkItems/${checkItemId}?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const deleteCheckListApi = async (checkListId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}checklists/${checkListId}?key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const updateCheckItemApi = async (cardId, checkItemId, state) => {
  try {
    const response = await axios.put(
      `${baseUrl}cards/${cardId}/checkItem/${checkItemId}?state=${state}&key=${API}&token=${token}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const calProgress = (arr) => {
  let inComplete = arr.filter((item) => item.state === "incomplete");

  return ((arr.length - inComplete.length) / arr.length) * 100;
};
