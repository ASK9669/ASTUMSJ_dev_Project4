import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
function Home({blogs,loading,error,deleteBlog,toggleBookmark,bookmarks,}) 
{
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
    <div className="contaipner  bg-gray-100 m-auto border shadow-lg ">
      <div className="container text-center mt-3 p-4 m-auto bg-gray-200">
        <h1 className="text-4xl font-bold text-center mb-8">WelCome to MinimalistBlog</h1>
        <p> A space for thoutful narratives minimalist design and the art ofsharing stories that matter. </p>
      </div>
      <div className="container m-auto px-5 py-8">
        <div className="container flex  justify-between">
          <div>
            <h1 className="text-4xl font-bold">Latest Storeis</h1>
            <p>Discover the lattest thoughts and narratives from our community</p>
          </div>
          <button className="bg-blue-400 m-8 p-2 rounded-md text-white">
            <Link className="hover:text-blue-900" to="/create">
              + Create Post
            </Link>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center mt-20">
              <h1 className="text-3xl font-bold">No Blogs Found</h1>
            </div>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                toggleBookmark={toggleBookmark}
                bookmarks={bookmarks}
                deleteBlog={deleteBlog}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
