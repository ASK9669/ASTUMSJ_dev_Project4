import BlogCard from "../components/BlogCard";

function Bookmarks({
  bookmarks,
  toggleBookmark,
  deleteBlog,
}) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-gray-500">
          No Bookmarked Blogs
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        📚 Bookmarked Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            toggleBookmark={toggleBookmark}
            bookmarks={bookmarks}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;