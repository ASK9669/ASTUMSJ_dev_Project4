import { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const wordCount = description
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  function handleSubmit(e) {
    e.preventDefault();
    const newBlog = { title, author, description };
    addBlog(newBlog);
    setTitle("");
    setAuthor("");
    setDescription("");
    navigate("/");
  }
  function returnTohome() {
    <Link className="hover:text-blue-400" to="/"></Link>;
  }

  return (
    <div className=" min-h-screen bg-gray-100 flex justify-center items-center p-5 text-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {" "}
          Create New Blog
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className=" w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
          <p className="text-sm text-gray-500 mt-2 float-right">
          Words: <span className="font-semibold">{wordCount}</span>
        </p>
        <textarea
          placeholder="Write your blog..."
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className=" w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      

        {/* Button */}
        <div className="float-left">
          <button className="m-5 font-bold">B</button>
          <button className="m-5 italic">I</button>
          <button className="m-5 underline italic">U</button>
        </div>
        <button
          type="submit"
          className=" w-20 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
