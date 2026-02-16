import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user, cookies, and localStorage
    navigate("/login"); // Redirect to login page
  };
  return (
    <nav className="sticky w-full p-4 flex items-center justify-end list-none border-b-2">
      {user && (
        <>
          <li className="mr-4 font-bold cursor-pointer text-gray-700">
            <Link to="/">all events</Link>
          </li>
          <li className="mr-4 font-bold cursor-pointer text-gray-700">
            <Link to="/profile">profile</Link>
          </li>
          <li className="mr-4 font-bold cursor-pointer text-gray-700">
            <Link to="/event">your events</Link>
          </li>
          <button
            type="button"
            onClick={handleLogout}
            className="w-30 mb-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
            LogOut
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
