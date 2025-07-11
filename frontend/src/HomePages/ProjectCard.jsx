import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="rounded-xl shadow-lg bg-[#0F141A] h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.015 }}
    >
      <div className="h-full rounded-xl overflow-hidden flex flex-col">
        <div className="w-full h-[200px] overflow-hidden rounded-lg relative group">
          <div className="absolute inset-0 z-10 transition-all duration-300 bg-black/30"></div>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-2 text-white flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 ml-2">
            <span className="px-2 py-1 bg-orange-600 text-black text-xs rounded-full">
              {project.category}
            </span>
          </div>

          <div className="flex flex-col flex-grow">
            <div className="flex-grow">
              <Link to={`/project/${project.slug}`}>
                <h3 className="text-lg font-semibold mb-1 hover:text-orange-600 ml-2">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed font-light mb-2 ml-2">
                {project.description}
              </p>
            </div>

            <div className="flex justify-end">
              <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/project/${project.slug}`}
                  className="inline-block px-4 py-2 bg-orange-600 text-black rounded-full hover:bg-orange-500 transition-colors duration-300 text-sm font-medium"
                >
                  View Project
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
