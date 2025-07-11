import { useEffect, useState } from "react";
import axios from "axios";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects`);
      const onlyProjects = res.data.filter((item) => item.type === "project");
      setProjects(onlyProjects);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900">
      <h2 className="text-4xl font-bold text-white mb-10 text-center"> All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500 border border-gray-700 transition-all duration-300 flex flex-col"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
              <p className="text-green-400 text-xs uppercase tracking-wide mb-6">{project.category}</p>
              <div className="mt-auto">
                <button
                  onClick={() => handleDelete(project._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
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

export default AllProjects;
