import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import BlogSection from './BlogSection';
import ProjectSection from './ProjectSection';
import SkillSection from './SkillSection';
import Hero from './Hero';
import ContactSection from './ContactSection';
import Sidebar from './Sidebar';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('hero');

  const menuItems = [
    { key: 'hero', label: 'Home' },
    { key: 'skillsection', label: 'Skill' },
    { key: 'projectsection', label: 'Project' },
    { key: 'blogsection', label: 'Blog' },
    { key: 'contact', label: 'Contact' },
  ];

  const renderCurrentSection = () => {
    switch (currentPage) {
      case 'hero':
        return <Hero />;
      case 'blogsection':
        return <BlogSection />;
      case 'projectsection':
        return <ProjectSection />;
      case 'skillsection':
        return <SkillSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white min-h-screen">
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen p-4 gap-4">
          <Sidebar />
          {/* Home Content */}
          <div className="flex flex-col justify-between w-full bg-[#161B22] mb-10 md:mb-0 rounded-2xl overflow-hidden shadow-2xl border border-[#27313D]">
            {/* Top Desktop Nav */}
            <div className="flex flex-row justify-end">
              <div className="hidden md:flex justify-end w-165 shadow-lg bg-[#0F141A] px-6 py-4 rounded-bl-2xl border-b border-[#27313D]">
                {menuItems.map(({ key, label }) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`mx-3 text-lg font-bold pr-8 ${
                      currentPage === key
                        ? 'text-orange-500'
                        : 'text-orange-400 hover:text-orange-500'
                    } transition-all ease-in-out`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main View Area with AnimatePresence */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderCurrentSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Mobile Nav (Fixed) */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0F141A] flex flex-row justify-between items-center p-4 border-t border-[#27313D] rounded-t-xl">
          {menuItems.map(({ key, label }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentPage(key)}
              className={`text-sm ${
                currentPage === key
                  ? 'text-orange-500 font-semibold'
                  : 'text-orange-600'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Home;
