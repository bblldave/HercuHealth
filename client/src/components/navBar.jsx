import { useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineMore, AiOutlineClose } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa6";
import OptionMenu from "./OptionMenu";
import NavMenu from "./NavMenu";

const NavBar = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);

  const optionButtonRef = useRef(null);

  return (
    <div className="bg-blue-600">
      <div className="flex flex-row justify-between p-6 text-white text-2xl z-50">
        <div>
          {isNavMenuOpen ? (
            <AiOutlineClose
              className="cursor-pointer"
              onClick={() => setIsNavMenuOpen(false)}
            />
          ) : (
            <AiOutlineMenu
              className=" cursor-pointer"
              onClick={() => setIsNavMenuOpen(true)}
            />
          )}
        </div>
        <div>
          <FaDumbbell />
        </div>
        <div>
          <button ref={optionButtonRef}>
            <AiOutlineMore
              className="cursor-pointer"
              onClick={() => setIsOptionMenuOpen(!isOptionMenuOpen)}
            />
          </button>
        </div>
      </div>

      {isNavMenuOpen ? <NavMenu /> : null}

      {isOptionMenuOpen && (
        <OptionMenu
          isOpen={isOptionMenuOpen}
          onClose={() => setIsOptionMenuOpen(false)}
          buttonRef={optionButtonRef}
        />
      )}
    </div>
  );
};

export default NavBar;
