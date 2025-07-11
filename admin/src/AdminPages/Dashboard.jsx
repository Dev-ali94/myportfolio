import  React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // <- IMPORT MOTION
import BlogCreate from './BlogCreate';
import AllBlogs from './AllBlogs';
import AllProject from './AllProject'
import ProjectCreate from './ProjectCreate'
import SkillCreate from './SkillCreate';
import AllSkills from './AllSkills';

function Dashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  const [createdBlogSlug, setCreatedBlogSlug] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    sessionStorage.clear();
    navigate('/login');
  };

  const handleBlogCreated = (slug) => {
    setCreatedBlogSlug(slug);
    setCurrentPage('allblogs');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-row">
      
      {/* Sidebar */}
      <div className="bg-gray-950 p-6 flex flex-col h-screen w-64 text-white shadow-2xl space-y-4">
        <h1 className="text-3xl font-extrabold text-blue-500 mb-12 tracking-wider">Admin</h1>

        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-400 text-md font-bold uppercase tracking-widest mb-1">Blog Management</h2>

          <div className="flex flex-col gap-4">
          <button
              onClick={() => setCurrentPage('createBlog')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">Create Blog</span>
            </button>
            <button
              onClick={() => setCurrentPage('allblogs')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">All Blogs</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-400 text-md font-bold uppercase tracking-widest mb-1">Project Management</h2>

          <div className="flex flex-col gap-4">
          <button
              onClick={() => setCurrentPage('createproject')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">Create project</span>
            </button>
            <button
              onClick={() => setCurrentPage('allproject')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">All project</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full"> 
          <h2 className="text-gray-400 text-md font-bold uppercase tracking-widest mb-1">Skill Management</h2>

          <div className="flex flex-col gap-4">
          <button
              onClick={() => setCurrentPage('createskill')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">create skill</span>
            </button>
            <button
              onClick={() => setCurrentPage('allskill')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/30 hover:bg-gray-800/100 transition-all group"
            >
              <span className="text-md font-medium group-hover:font-semibold">All skills</span>
            </button>
          </div>
        </div>
        <div className="flex-grow"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all font-semibold"
        >
          <span className="text-md">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow h-screen overflow-auto p-8 bg-gray-900">
        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div 
              className="bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <h1 className="text-5xl font-extrabold text-blue-400 mb-4">👋 Welcome to the Admin Dashboard</h1>
              <p className="text-gray-300 text-lg">
                Manage your blogs efficiently and keep everything organized.
              </p>
            </motion.div>
          </div>
        )}
        {currentPage === 'createBlog' && <BlogCreate onBlogCreated={handleBlogCreated} />}
        {currentPage === 'allblogs' && <AllBlogs />}
        {currentPage === 'createproject' && <ProjectCreate />}
        {currentPage === 'allproject' && <AllProject />}
        {currentPage === 'createskill' && <SkillCreate/>}
        {currentPage === 'allskill' && <AllSkills/>}
      </main>
    </div>
  );
}

export default Dashboard;
