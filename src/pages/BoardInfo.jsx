import React, { useEffect, useReducer } from "react";
import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ListBox from "../components/app/ListBox";
import { Input } from "../components/ui/input";
import {
  addNewList,
  fetchLists,
  archiveList,
} from "../redux/AsyncThunks/thunks";
import { setAddList, newList } from "../redux/slices/ListSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";

const BoardInfo = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const location = useLocation();
  const { board } = location.state || {};
  const dispatch = useDispatch();
  const { lists, newListName, addList } = useSelector((state) => state.list);
  const { loading } = useSelector((state) => state.loading);
  const { error } = useSelector((state) => state.error);

  const handleArchiveList = async (listId) => {
    try {
      const response = await dispatch(archiveList(listId));
      toast.success("List removed successfully.");
    } catch (err) {
      console.log(err.message);
      toast.error("Error removing List.");
    }
  };

  const handleAddList = async () => {
    try {
      const response = await dispatch(
        addNewList({ listName: newListName, boardID: boardId })
      );
      toast.success("List Added successfully.");
    } catch (err) {
      console.log(err.message);
      toast.error("Error Adding List. Try Again!");
    }
  };

  useEffect(() => {
    dispatch(fetchLists(boardId));
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
        {!loading ? (
          lists.map((list) => {
            return (
              <ListBox
                key={list.id}
                handleArchiveList={() => handleArchiveList(list.id)}
                list={list}
              />
            );
          })
        ) : (
          <Loader />
        )}
        <div className="flex flex-col h-fit gap-6 rounded-xl border py-6 p-4 shadow-sm w-60">
          {addList ? (
            <>
              <Input
                value={newListName}
                onChange={(e) => dispatch(newList(e.target.value))}
                placeholder="Enter list name"
              ></Input>
              <div className="flex justify-center gap-2.5 w-full">
                <Button onClick={() => handleAddList()} variant={"custom"}>
                  Add
                </Button>
                <Button
                  onClick={() => dispatch(setAddList())}
                  variant={"custom"}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={() => dispatch(setAddList())}
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
