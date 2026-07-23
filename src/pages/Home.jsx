import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

function Home({
  blogs,
  loading,
  error,
  deleteBlog,
  toggleBookmark,
  bookmarks,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white shadow-md py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Minimalist Blog
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            A space for thoughtful narratives, minimalist design, and the art
            of sharing stories that matter.
          </p>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold">
              Latest Stories
            </h2>

            <p className="text-gray-500 mt-2">
              Discover the latest thoughts and narratives from our community.
            </p>
          </div>

          <Link
            to="/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Post
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-500">
              No Blogs Found
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                deleteBlog={deleteBlog}
                toggleBookmark={toggleBookmark}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;