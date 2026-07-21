
import BlogForm from "../components/BlogForm";

function CreatePost({ addBlog }) {
  return (
    <div>
      <BlogForm addBlog={addBlog} />
    </div>
  );
}

export default CreatePost;