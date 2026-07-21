import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function BlogDetails({ blogs }) {
  const { id } = useParams();

  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    return <h2 className="text-center text-2xl mt-10">Blog not found</h2>;
  }

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      py-10
      px-5
    "
    >
      <article
        className="
        max-w-3xl
        mx-auto
        bg-white
        rounded-xl
        shadow-lg
        overflow-hidden
      "
      >
        {" "}
        <button className="m-auto p-3">
          <Link
            className="hover:text-blue-400 text-blue-500 m-4 p-4 bold font-bold"
            to="/"
          >
            ⬅️ Back
          </Link>
        </button>
        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-80
            object-cover
          "
        />
        <div className="p-8">
          {/* Title */}
          <h1
            className="
            text-4xl
            font-bold
            mb-4
          "
          >
            {blog.title}
          </h1>

          {/* Author */}
          <p
            className="
            text-gray-500
            mb-6
          "
          >
            Written by <span className="font-semibold">{blog.author}</span>
          </p>

          {/* Content */}
          <p className="whitespace-pre-line">{blog.description}</p>
        </div>
      </article>
    </div>
  );
}

export default BlogDetails;
