import { useEffect, useState } from "react";
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`);
      const onlyBlogs = res.data.filter((item) => item.type === "blog");
      setBlogs(onlyBlogs);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

 const handleDelete = async (id) => {
  console.log("Attempting to delete blog with id:", id);

  const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/blogs/${id}`);
    setBlogs((prev) => prev.filter((blog) => blog._id !== id));
  } catch (err) {
     console.error("Failed to delete blogs", err);
  }
};
  return (
    <div className="p-10 min-h-screen bg-gray-900">
      <h2 className="text-4xl font-bold text-white mb-10 text-center"> All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500 border border-gray-700 transition-all duration-300 flex flex-col"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
              <p className="text-blue-400 text-xs uppercase tracking-wide mb-6">{blog.category}</p>
              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-grow bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;