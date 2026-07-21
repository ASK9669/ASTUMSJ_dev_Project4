import { Link } from "react-router-dom";

function BlogCard({
  blog,
  toggleBookmark,
  bookmarks,
  deleteBlog,
}) {
  const isBookmarked = bookmarks.some(
    (item) => item.id === blog.id
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="p-5">
        {/* <img
          className="rounded-lg w-full h-48 object-cover"
          src={blog.image}
          alt={blog.title}
        /> */}

        <h2 className="text-2xl font-bold mt-3">
          {blog.title}
        </h2>

        <p className="text-gray-500">
          By {blog.author}
        </p>

        <p className="mt-2">
          {blog.description}
        </p>

        <div className="flex gap-3 mt-4">
          <Link
            to={`/blog/${blog.id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            Read More
          </Link>

          <button
            onClick={() => toggleBookmark(blog)}
            className=" text-black rounded hover:bg-yellow-600"
          >
            {isBookmarked ? "💛" : "🤍 "}
          </button>

          <button
            onClick={() => deleteBlog(blog.id)}
            className=" text-black rounded hover:bg-red-700"
          >
           🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;