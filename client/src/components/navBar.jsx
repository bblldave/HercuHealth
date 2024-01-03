import { useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineMore } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa6";
import OptionMenu from "./OptionMenu";
import NavMenu from "./NavMenu";

const NavBar = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);

  return (
    <div className="bg-blue-600">
      <div className="flex flex-row justify-between p-6 text-white text-2xl z-50">
        <div>
          <AiOutlineMenu
            className=" cursor-pointer"
            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
          />
        </div>
        <div>
          <FaDumbbell />
        </div>
        <div>
          <AiOutlineMore
            className="cursor-pointer"
            onClick={() => setIsOptionMenuOpen(!isOptionMenuOpen)}
          />
        </div>
      </div>

      {isNavMenuOpen ? <NavMenu /> : null}

      {isOptionMenuOpen && <OptionMenu />}
    </div>
  );
};

export default NavBar;
