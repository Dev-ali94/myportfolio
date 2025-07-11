import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const target = skill.progressBar;
      const increment = Math.ceil(target / 50);
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(interval);
        }
        setCurrentPercentage(start);
      }, 30);
    }
  }, [isVisible, skill.progressBar]);

  return (
    <motion.div
      ref={progressBarRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-[#0F141A] p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      {/* Skill Header */}
      <motion.div
        className="flex items-center space-x-4 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
          {skill.image && (
            <motion.img
              src={skill.image}
              alt={skill.title}
              className="w-12 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          )}
        </div>
        <motion.h3
          className="text-lg font-bold text-white"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {skill.title}
        </motion.h3>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="mt-2"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-white">Proficiency</span>
          <span className="text-sm font-medium text-gray-400">
            {currentPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-orange-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.progressBar}%` : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-gray-400 text-sm mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {skill.description}
      </motion.p>
    </motion.div>
  );
};

export default SkillCard;
