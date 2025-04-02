import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { getListApi } from "../services/utils";
import ListBox from "../components/app/ListBox";
import { Input } from "../components/ui/input";
import { createListInBoardApi, archiveListApi } from "../services/utils";

const BoardInfo = () => {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addList, setAddList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  const handleArchiveList = async (listId) => {
    console.log("in");

    console.log(lists);
    try {
      const response = await archiveListApi(listId);
      if (response) {
        console.log(response);
        setLists((prev) => {
          const updatedLists = prev.filter((current) => listId != current.id);

          return updatedLists;
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddList = () => {
    async function addList() {
      try {
        const response = await createListInBoardApi(newListName, boardId);
        setLists((prev) => [...prev, response.data]);
        setNewListName("");
      } catch (err) {
        console.log(err.message);
      }
    }
    addList();
  };

  const handleCancelAdd = () => {
    setAddList(!addList);
    setNewListName("");
  };

  useEffect(() => {
    async function fetchLists() {
      try {
        setLoading(true);
        const response = await getListApi(boardId);
        console.log(response);
        setLists(response);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
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
            <h1 className=" py-3 text-3xl ">My Boards</h1>
          </div>
        </div>
      </div>

      <div className="flex mt-40 gap-6 overflow-scroll h-[82vh] p-3 ">
        {!loading ? (
          lists.map((list) => {
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
          {addList ? (
            <>
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
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
              onClick={() => setAddList(!addList)}
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
