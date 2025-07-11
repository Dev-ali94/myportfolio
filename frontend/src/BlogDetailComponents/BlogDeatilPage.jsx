import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';
import Sidebar from '../HomePages/Sidebar';
import { motion } from 'framer-motion';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-gray-900 px-4 py-4 flex flex-col lg:flex-row gap-4 w-full">
      <Sidebar />
      <div className="bg-[#161B22] text-white rounded-3xl p-3 flex-1 min-w-0 overflow-y-auto h-screen">
        <div className="p-4">
          {/* Blog Image */}
          {blog.image && (
            <motion.div
              className="m-6 bg-gray-100 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-[500px] object-cover rounded-2xl"
              />
            </motion.div>
          )}

          {/* Author Info */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {blog.authorImage && (
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-orange-600"
              />
            )}
            <div>
              <p className="text-lg font-semibold">{blog.author}</p>
              <p className="text-sm text-gray-400">
                {new Date(blog.date).toDateString()}
              </p>
            </div>
          </motion.div>

          {/* Blog Sections */}
          {blog.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id || sectionIndex}
              className="mb-10 p-10 bg-gray-900 rounded-2xl w-full max-w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white break-words">
                {section.title}
              </h2>
              {section.subsections.map((subsection, subsectionIndex) => (
                <motion.div
                  key={subsection.id || subsectionIndex}
                  className="ml-2 sm:ml-6 mb-4 w-full max-w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: subsectionIndex * 0.15 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white break-words">
                    {subsection.subtitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words w-full">
                    {subsection.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ))}

          {/* Comment Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <CommentSection blogId={blog._id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
