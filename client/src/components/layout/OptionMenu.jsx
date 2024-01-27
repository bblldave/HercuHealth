import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";

const OptionMenu = ({ isOpen, onClose, buttonRef }) => {
  const menuRef = useRef();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Attach the event listener
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef, menuRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
    >
      <ul>
        {isLoggedIn ? (
          <>
            <li className="text-center p-2">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="text-center p-2">Sign Out</li>
          </>
        ) : (
          <>
            <li className="text-center p-2">
              <Link to="/login">Log in</Link>
            </li>
            <li className="text-center  p-2">
              <Link to="/register">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default OptionMenu;
