import { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "./SkillCard";
import CategoryFilter from "./CategoryFilter";
import { motion } from "framer-motion";

const loadingDotVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/skills`)
      .then((res) => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="px-4 sm:px-6 lg:px-12 py-12 rounded-2xl overflow-y-auto max-h-160"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
            My Skills
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Explore my expertise in various categories, including frontend, backend, and tools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </motion.div>

        {/* Skill Cards or Loading Animation */}
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No skills available in this category.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillSection;
