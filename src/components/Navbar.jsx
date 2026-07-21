import { Link } from "react-router-dom";
import logo from "../assets/ASKlogo.jpeg";

function Navbar() {
  return (
    <nav className=" bg-gray-200 text-black p-5 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-500">ListBlog</div>

      {/* Links */}
      <div className="flex gap-6">
        <Link className="hover:text-blue-400" to="/">
          Home
        </Link>

        <Link className="hover:text-blue-400" to="/create">
          Create Post
        </Link>

        <Link className="hover:text-blue-400" to="/bookmarks">
          Bookmarks
        </Link>
      </div>
      <div className="flex justify-between">
        <button>🔍</button>
        <img src={logo} alt="ASK Logo" className="w-5 h-5 rounded-full" />
      </div>
    </nav>
  );
}

export default Navbar;
