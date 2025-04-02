import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AddBoardModal } from "../app/AddBoardModal";
import { useNavigate } from "react-router-dom";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBoards() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.trello.com/1/members/me/boards?key=87914a0e1a430d48d408db9396f9bb0b&token=ATTA553f5fcddd181a2dfd5393b5ee0f55b0b0c045feebdfb8eafec075d827ae6d051C652DE1"
        );
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
                onClick={() => navigate(`/boards/${board.id}`)}
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
