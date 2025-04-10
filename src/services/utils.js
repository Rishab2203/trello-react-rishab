import axiosInstance from "../http/axios";

export const getAllBoardsApi = async () => {
  try {
    const response = await axiosInstance.get(`/members/me/boards`);
    return response;
  } catch (err) {
    console.log("Error adding board", err.message);
  }
};

export const addNewBoard = async (boardName) => {
  try {
    const response = await axiosInstance.post(
      `/boards?name=${boardName}&prefs_background=blue`
    );
    return response;
  } catch (err) {
    console.log("Error adding board", err.message);
  }
};

export const getListApi = async (boardID) => {
  try {
    const response = await axiosInstance.get(`/boards/${boardID}/lists`);
    return response.data;
  } catch (err) {
    console.log("Error getting list", err.message);
  }
};

export const getCardsInListApi = async (listId) => {
  try {
    const response = await axiosInstance.get(`/lists/${listId}/cards`);
    return response.data;
  } catch (err) {
    console.log("Error getting cards", err.message);
  }
};

export const createCardInListApi = async (cardName, listId) => {
  try {
    const response = await axiosInstance.post(
      `/cards?name=${cardName}&idList=${listId}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("Error adding card in list", err.message);
  }
};

export const createListInBoardApi = async (listName, boardId) => {
  try {
    const response = await axiosInstance.post(
      `/boards/${boardId}/lists?name=${listName}`
    );
    return response;
  } catch (err) {
    console.log("Error adding list in board", err.message);
  }
};

export const archiveListApi = async (listId) => {
  try {
    const response = await axiosInstance.put(
      `/lists/${listId}/closed?value=true`
    );
    return response;
  } catch (err) {
    console.log("Error archieving list in board", err.message);
  }
};

export const deleteCardApi = async (cardId) => {
  try {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response;
  } catch (err) {
    console.log("Error archieving list in board", err.message);
  }
};

export const getCheckListsApi = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}/checklists`);
    return response;
  } catch (err) {
    console.log("Error getting checklist in list", err.message);
  }
};

export const addCheckListApi = async (cardId, checkListName) => {
  try {
    const response = await axiosInstance.post(
      `/cards/${cardId}/checklists?name=${checkListName}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checklist in list", err.message);
  }
};

export const addCheckItemApi = async (checkListId, checkItemName) => {
  try {
    const response = await axiosInstance.post(
      `/checklists/${checkListId}/checkItems?name=${checkItemName}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const getCheckItemsApi = async (checkListId) => {
  try {
    const response = await axaxiosInstanceios.get(
      `/checklists/${checkListId}/checkItems`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const deleteCheckItemApi = async (checkListId, checkItemId) => {
  try {
    const response = await axiosInstance.delete(
      `/checklists/${checkListId}/checkItems/${checkItemId}`
    );
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const deleteCheckListApi = async (checkListId) => {
  try {
    const response = await axiosInstance.delete(`/checklists/${checkListId}`);
    return response;
  } catch (err) {
    console.log("Error adding checkItem in checklist", err.message);
  }
};

export const updateCheckItemApi = async (cardId, checkItemId, state) => {
  try {
    const response = await axiosInstance.put(
      `/cards/${cardId}/checkItem/${checkItemId}?state=${state}`
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
