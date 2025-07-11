import { useEffect, useState } from "react";
import axios from "axios";

const AllSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/skills`);
      setSkills(res.data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/skills/${id}`);
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
    } catch (err) {
      console.error("Failed to delete skill", err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900">
      <h2 className="text-4xl font-bold text-white mb-10 text-center">All Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500 border border-gray-700 transition-all duration-300 flex flex-col"
          >
            {skill.image && (
              <div className="p-4">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2">{skill.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{skill.description}</p>
              <p className="text-blue-400 text-xs uppercase tracking-wide mb-2">{skill.category}</p>
              <p className="text-green-400 text-sm font-semibold mb-6">Progress: {skill.progressBar}%</p>
              <div className="mt-auto">
                <button
                  onClick={() => handleDelete(skill._id)}
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

export default AllSkills;