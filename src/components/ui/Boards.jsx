import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBoardModal } from "../app/AddBoardModal";
import { useNavigate } from "react-router-dom";

import { fetchBoards } from "../../redux/AsyncThunks/thunks";
import Loader from "./Loader";

const Boards = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.board);
  const { loading } = useSelector((state) => state.loading);
  const { error } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  return (
    <div className="flex p-6 gap-10 flex-wrap mt-32 justify-around">
      {loading ? (
        <Loader />
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
          <AddBoardModal />
        </>
      )}
    </div>
  );
};

export default Boards;
