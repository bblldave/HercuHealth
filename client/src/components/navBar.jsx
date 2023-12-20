import React from "react";
import { AiOutlineMenu, AiOutlineMore } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa6";

const NavBar = () => {
  return (
    <div className="bg-blue-600">
      <div className="flex flex-row justify-between p-6 text-white text-2xl">
        <div>
          <AiOutlineMenu />
        </div>
        <div>
          <FaDumbbell />
        </div>
        <div>
          <AiOutlineMore />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
