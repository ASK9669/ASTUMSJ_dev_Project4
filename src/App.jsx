import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Bookmarks from "./pages/Bookmarks";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import initialBlogs from "./data/blogs";

function App() {
  // Blogs
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("blogs");
    return savedBlogs ? JSON.parse(savedBlogs) : initialBlogs;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Save blogs
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);

        const response = await fetch("https://dummyjson.com/posts?limit=10");
   
          return response.json();
   

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        const apiBlogs = data.posts.map((post) => ({
          id: post.id,
          title: post.title,
          author: "DummyJSON",
          description: post.body,
          image: `https://picsum.photos/600/400?random=${post.id}`,
        }));

        // Only load API blogs if localStorage doesn't already contain blogs
        const savedBlogs = localStorage.getItem("blogs");

        if (!savedBlogs) {
          setBlogs(apiBlogs);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    

    fetchBlogs();
  }, []);
  
  // Create Blog
  function addBlog(newBlog) {
    const blog = {
      ...newBlog,
      id: Date.now(),
      image: `https://picsum.photos/400/250?random=${Date.now()}`,
    };

    setBlogs([...blogs, blog]);
  }

  // Delete Blog
  function deleteBlog(id) {
    setBlogs(blogs.filter((blog) => blog.id !== id));

    // Remove from bookmarks if bookmarked
    setBookmarks(bookmarks.filter((blog) => blog.id !== id));
  }

  // Bookmark
  function toggleBookmark(blog) {
    const exists = bookmarks.some((item) => item.id === blog.id);

    if (exists) {
      setBookmarks(bookmarks.filter((item) => item.id !== blog.id));
    } else {
      setBookmarks([...bookmarks, blog]);
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              loading={loading}
              error={error}
              deleteBlog={deleteBlog}
              toggleBookmark={toggleBookmark}
              bookmarks={bookmarks}
            />
          }
        />

        <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />

        <Route path="/create" element={<CreatePost addBlog={addBlog} />} />

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
