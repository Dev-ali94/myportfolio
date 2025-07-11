import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Reusable animation variant
  const entryAnim = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  return (
    <div className="w-full">
      {/* Mobile dropdown */}
      <motion.div
        {...entryAnim}
        className="sm:hidden relative"
      >
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg flex justify-between items-center"
        >
          {categories.find(cat => cat.id === activeCategory)?.name || 'Select Category'}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-gray-800 mt-1 rounded-lg shadow-lg z-10"
            >
              {categories.map(cat => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 ${activeCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Desktop buttons with entry animation */}
      <motion.div
        {...entryAnim}
        className="hidden sm:flex flex-wrap gap-2 bg-gray-800 p-3 rounded-lg mt-2 sm:mt-0 mx-auto w-fit"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${activeCategory === cat.id
              ? 'bg-orange-600 text-white'
              : 'bg-gray-900 text-gray-300 hover:bg-gray-600'
              }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
