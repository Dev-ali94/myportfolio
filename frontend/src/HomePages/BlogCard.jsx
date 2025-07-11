import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="rounded-xl shadow-lg bg-[#0F141A] flex flex-col"
  >
    <div className="h-full rounded-xl overflow-hidden flex flex-col">
      <div className="absolute inset-[1px] rounded-xl z-[-1]" />
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-full h-[200px] overflow-hidden rounded-lg"
      >
        {blog.image && (
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>

      <div className="p-2 text-white flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 ml-2">
          <span className="px-2 py-1 bg-orange-600 text-black text-xs rounded-full">
            {blog.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <p>{blog.date}</p>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-1 ml-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light mb-2 ml-2">
              {blog.excerpt}
            </p>
          </div>

          <div className="flex justify-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={`/blog/${blog.slug}`}
                className="inline-block px-4 py-2 bg-orange-600 text-black rounded-full hover:bg-orange-500 transition-colors duration-300 text-sm font-medium"
              >
                Read More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default BlogCard;
