import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import CategoryFilter from './CategoryFilter';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Bouncing dot animation
const loadingDotVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'design', name: 'Frontend' },
    { id: 'web-dev', name: 'Full Stack' },
    { id: 'api', name: 'REST API' },
    { id: 'chatbot', name: 'Chatbot' }, // Fixed duplicate 'ai' ID
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/projects`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter(
          (project) =>
            project.category.toLowerCase().replace(/\s/g, '-') ===
            activeCategory
        );

  return (
    <section
      id="projects"
      className="px-4 sm:px-6 lg:px-12 py-12 rounded-2xl overflow-y-auto max-h-160"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
            Latest Projects
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            A complete project showcasing its purpose, goals, features, and
            development process using modern technologies and best practices.
          </p>
        </motion.div>

        {/* Animated Category Filter */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </motion.div>

        {/* Project Grid or Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex space-x-2">
              <motion.span
                className="w-3 h-3 bg-orange-500 rounded-full"
                variants={loadingDotVariants}
                animate="animate"
              />
              <motion.span
                className="w-3 h-3 bg-orange-500 rounded-full"
                variants={loadingDotVariants}
                animate="animate"
                transition={{ delay: 0.2 }}
              />
              <motion.span
                className="w-3 h-3 bg-orange-500 rounded-full"
                variants={loadingDotVariants}
                animate="animate"
                transition={{ delay: 0.4 }}
              />
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project._id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
