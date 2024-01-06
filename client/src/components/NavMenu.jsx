import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <div className="container flex flex-col justify-center align-middle mx-auto py-10 fixed top-50 left-50 bg-white h-screen">
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
