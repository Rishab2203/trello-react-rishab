import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AddBoardModal } from "../app/AddBoardModal";
import { useNavigate } from "react-router-dom";
import { getAllBoardsApi } from "../../services/utils";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBoards() {
      try {
        setLoading(true);
        const response = await getAllBoardsApi();
        setBoards(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBoards();
  }, []);
  return (
    <div className="flex p-6 gap-10 flex-wrap mt-32 justify-around">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {boards.map((board) => {
            return (
              <button
                key={board.id}
                className="  text-xl font-semibold flex items-center justify-center w-64 h-44 p-4 rounded-md cursor-pointer transform transition duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${
                    board["prefs"]["backgroundImage"] || "./defaultBg.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                onClick={() =>
                  navigate(`/boards/${board.id}`, {
                    state: { board: board["name"] },
                  })
                }
              >
                {board["name"]}
              </button>
            );
          })}
          <AddBoardModal setBoards={setBoards} />
        </>
      )}
    </div>
  );
};

export default Boards;
