import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <div className="container text-white flex flex-col justify-center align-middle mx-auto py-10">
      <ul>
        <li className="text-center p-2">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="text-center  p-2">
          <Link to="/programs">Programs</Link>
        </li>
        <li className="text-center  p-2">
          <Link to="/workouts">Workouts</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
