import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Bookmarks from "./pages/Bookmarks";
import CreatePost from "./pages/CreatePost";

import "./App.css";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("blogs");
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [apiBlogs, setApiBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch posts from DummyJSON
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/posts?limit=10"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        const posts = data.posts.map((post) => ({
          id: post.id,
          title: post.title,
          author: `User ${post.userId}`,
          description: post.body,
          tags: post.tags,
          reactions: post.reactions,
          image: `https://picsum.photos/600/400?random=${post.id}`,
        }));

        setApiBlogs(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  function addBlog(newBlog) {
    const blog = {
      ...newBlog,
      id: Date.now(),
    };

    setBlogs((prevBlogs) => [...prevBlogs, blog]);
  }
  function deleteBlog(id) {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== id)
    );

    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((blog) => blog.id !== id)
    );
  }
  function toggleBookmark(blog) {
    const exists = bookmarks.some(
      (item) => item.id === blog.id
    );

    if (exists) {
      setBookmarks(
        bookmarks.filter((item) => item.id !== blog.id)
      );
    } else {
      setBookmarks([...bookmarks, blog]);
    }
  }
  const allBlogs = [...blogs, ...apiBlogs];

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={allBlogs}
              loading={loading}
              error={error}
              deleteBlog={deleteBlog}
              toggleBookmark={toggleBookmark}
              bookmarks={bookmarks}
            />
          }
        />

        <Route
          path="/blog/:id"
          element={
            <BlogDetails
              blogs={allBlogs}
            />
          }
        />

        <Route
          path="/create"
          element={
            <CreatePost
              addBlog={addBlog}
            />
          }
        />

        <Route
          path="/bookmarks"
          element={
            <Bookmarks
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;