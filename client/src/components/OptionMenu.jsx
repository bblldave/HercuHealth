import React from "react";
import { Link } from "react-router-dom";

const OptionMenu = () => {
  return (
    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      <ul>
        <li className="text-center p-2">
          <Link to="/login">Log in</Link>
        </li>
        <li className="text-center  p-2">
          <Link to="/register">Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default OptionMenu;
