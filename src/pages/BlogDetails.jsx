import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function BlogDetails({ blogs }) {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Check if it is a locally created blog
        const localBlog = blogs.find((item) => item.id === Number(id));

        if (localBlog) {
          setBlog(localBlog);
          setComments([]);
          return;
        }

        // Fetch blog
        const postResponse = await fetch(`https://dummyjson.com/posts/${id}`);

        if (!postResponse.ok) {
          throw new Error("Post not found");
        }

        const post = await postResponse.json();

        setBlog(post);

        // Fetch comments
        const commentResponse = await fetch(
          `https://dummyjson.com/comments/post/${id}`,
        );

        const commentData = await commentResponse.json();

        setComments(commentData.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, blogs]);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-red-600 text-3xl mt-20">{error}</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <NavLink to="/">
          <button className="text-blue-500 font-semibold hover:text-blue-900 m-5">
            ⬅️ Back{" "}
          </button>
      </NavLink>
      
      {/* Show uploaded image only if available */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
      )}

      <h1 className="text-5xl font-bold">{blog.title}</h1>

      <p className="text-gray-500 mt-3">
        Author: {blog.author || `User ${blog.userId}`}
      </p>

      <p className="mt-8 text-lg whitespace-pre-line">
        {blog.description || blog.body}
      </p>

      {/* Tags */}
      {blog.tags && (
        <div className="flex gap-3 mt-8 flex-wrap">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comments */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4 mb-4">
              <h3 className="font-bold">{comment.user.username}</h3>

              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
