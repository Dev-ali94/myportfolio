import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import CategoryFilter from './CategoryFilter';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // <-- new state

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'ai-chatbot', name: 'AI Chatbots' },
    { id: 'machine-learning', name: 'Machine Learning' },
  ];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false); // done loading
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

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

  return (
    <section id="blog" className="px-4 sm:px-6 lg:px-12 py-12 rounded-2xl overflow-y-auto max-h-160">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-orange-500"
          >
            Latest Articles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 mt-4 text-sm sm:text-base"
          >
            Explore insightful articles covering ideas, experiences, and tutorials on development, design, and the latest tech trends.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10 px-2">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </div>

        {/* Blog Grid or Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex space-x-2">
              <motion.span className="w-3 h-3 bg-orange-500 rounded-full" variants={loadingDotVariants} animate="animate" />
              <motion.span className="w-3 h-3 bg-orange-500 rounded-full" variants={loadingDotVariants} animate="animate" transition={{ delay: 0.2 }} />
              <motion.span className="w-3 h-3 bg-orange-500 rounded-full" variants={loadingDotVariants} animate="animate" transition={{ delay: 0.4 }} />
            </div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
          >
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
