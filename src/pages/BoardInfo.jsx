import React, { useEffect, useReducer } from "react";
import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getListApi } from "../services/utils";
import ListBox from "../components/app/ListBox";
import { Input } from "../components/ui/input";
import { createListInBoardApi, archiveListApi } from "../services/utils";

const initialState = {
  lists: [],
  loading: false,
  addList: false,
  newListName: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "newListName":
      return {
        ...state,
        newListName: action.value,
      };
    case "addListItems":
      return {
        ...state,
        lists: [...state.lists, ...action.data],
        newListName: "",
      };
    case "loading":
      return {
        ...state,
        loading: !state.loading,
      };
    case "archiveList":
      const updated = state.lists.filter((item) => item.id != action.id);
      return {
        ...state,
        lists: updated,
      };
    case "addList":
      return {
        ...state,
        addList: !state.addList,
        newListName: "",
      };
  }
};

const BoardInfo = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const { board } = location.state || {};

  const handleArchiveList = async (listId) => {
    try {
      const response = await archiveListApi(listId);
      dispatch({ type: "archiveList", id: listId });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddList = () => {
    async function addList() {
      try {
        const response = await createListInBoardApi(state.newListName, boardId);
        dispatch({ type: "addListItems", data: [response.data] });
      } catch (err) {
        console.log(err.message);
      }
    }
    addList();
  };

  const handleCancelAdd = () => {
    dispatch({ type: "addList" });
  };

  useEffect(() => {
    async function fetchLists() {
      try {
        dispatch({ type: "loading" });
        const response = await getListApi(boardId);

        dispatch({ type: "addListItems", data: response });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "loading" });
      }
    }
    fetchLists();
  }, []);

  return (
    <>
      <div className=" fixed left-0 top-0 w-full z-10">
        <Navbar />
        <div className="pacifico-regular shadow-md p-1 px-10  bg-white ">
          <div className="w-[50vw]  flex justify-between items-center">
            <Button
              onClick={() => navigate("/")}
              variant={"projectDefault"}
              size={"lg"}
            >
              All Boards
            </Button>
            <h1 className=" py-3 text-3xl ">{board}</h1>
          </div>
        </div>
      </div>

      <div className="flex mt-40 gap-6 overflow-scroll h-[82vh] p-3 ">
        {!state.loading ? (
          state.lists.map((list) => {
            console.log("list", list);
            return (
              <ListBox
                key={list.id}
                handleArchiveList={() => handleArchiveList(list.id)}
                list={list}
              />
            );
          })
        ) : (
          <span>Loading</span>
        )}
        <div className="flex flex-col h-fit gap-6 rounded-xl border py-6 p-4 shadow-sm w-60">
          {state.addList ? (
            <>
              <Input
                value={state.newListName}
                onChange={(e) =>
                  dispatch({ type: "newListName", value: e.target.value })
                }
                placeholder="Enter list name"
              ></Input>
              <div className="flex justify-center gap-2.5 w-full">
                <Button onClick={() => handleAddList()} variant={"custom"}>
                  Add
                </Button>
                <Button onClick={handleCancelAdd} variant={"custom"}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={() => dispatch({ type: "addList" })}
              className={"w-full "}
              variant={"custom"}
            >
              &#43; Add List
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BoardInfo;
