import React from "react";
import Navbar from "../components/ui/Navbar";
import Boards from "../components/ui/Boards";

const Home = () => {
  return (
    <>
      <div className=" fixed left-0 top-0 w-full z-10">
        <Navbar />
        <h1 className="pacifico-regular bg-white flex justify-center items-center  shadow-md py-3 text-3xl ">
          My Boards
        </h1>
      </div>

      <Boards />
    </>
  );
};

export default Home;
