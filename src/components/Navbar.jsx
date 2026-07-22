import { NavLink } from "react-router-dom";
import logo from "../assets/ASKlogo.jpeg";

function Navbar() {
  return (
    <nav className=" bg-gray-200 text-black p-5 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-500">ListBlog</div>
      <div className="flex gap-6">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-blue-500 bold underline" : "";
          }}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-blue-500 underline" : "";
          }}
          to="/create"
        >
          Create Post
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-blue-500 underline" : "";
          }}
          to="/bookmarks"
        >
          Bookmarks
        </NavLink>
      </div>
      <div className="flex justify-between">
        <button className="mr-2">🔍</button>
        <img src={logo} alt="ASK Logo" className="w-7 h-7 ml-2 rounded-full" />
      </div>
    </nav>
  );
}

export default Navbar;
