import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  my_image,
  email,
  telephone,
  calender,
  address,
  facebook,
  insta,
  github,
} from "../assets/assest";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`${isMobile ? 'w-full' : 'md:w-[20%]'
        } bg-[#161B22] text-[#00FFFF] rounded-xl shadow-lg px-2 py-4 transition-all duration-300 ease-in-out border border-[#27313D] ${isMobile ? (sidebarOpen ? 'h-auto' : 'h-40') : 'h-[95vh]'
        } md:rounded-2xl relative overflow-hidden flex-shrink-0`}
    >
      {/* Toggle button for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 right-4 md:hidden text-orange-500 text-2xl"
      >
        {sidebarOpen ? "▲" : "▼"}
      </button>

      {/* Avatar, Name, Title */}
      {/* Avatar, Name, Title */}
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  className="flex flex-col items-center text-center space-y-1"
>
  <div className="w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#0F141A] shadow-lg">
    <img
      src={my_image}
      alt="Ali Imran"
      className="w-full h-full object-cover"
    />
  </div>
  <h1 className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent text-xl md:text-2xl font-semibold">
    Ali Imran
  </h1>
  <p className="text-gray-400 text-sm font-md px-3 py-1 rounded-lg shadow-md bg-[#0F141A]">
    Web Developer
  </p>
</motion.div>

      {/* Sidebar content */}
      {(sidebarOpen || !isMobile) && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mt-6 space-y-6 px-2"
        >
          <div className="w-full h-px bg-gray-800"></div>
          {/* Contact Info */}
          <ul className="space-y-4">
            {[
              {
                icon: email,
                title: "EMAIL",
                line1: "Sheikhaliimran5452",
                line2: "@gmail.com",
              },
              {
                icon: telephone,
                title: "PHONE",
                line1: "0329-4704692",
              },
              {
                icon: calender,
                title: "BIRTHDAY",
                line1: "01-JUNE-2007",
              },
              {
                icon: address,
                title: "ADDRESS",
                line1: "Multan,Punjab,Pakistan",
              },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                custom={idx + 1}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0F141A] shadow-md">
                  <img src={item.icon} alt="" className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-bold mb-1">
                    {item.title}
                  </p>
                  <p className="text-white text-sm font-medium">{item.line1}</p>
                  {item.line2 && (
                    <span className="text-white text-sm font-medium">
                      {item.line2}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="w-full h-px bg-gray-800"></div>

          {/* Social Links */}
          <motion.ul
            variants={fadeInUp}
            custom={5}
            className="flex items-center space-x-2 w-full justify-center"
          >
            {[github, facebook, insta].map((icon, i) => (
              <li key={i}>
                <div className="h-11 w-11 rounded-full bg-[#0F141A] flex items-center justify-center hover:bg-[#27313D]">
                  <a
                    href={
                      i === 0
                        ? "https://github.com/Dev-ali94"
                        : i === 1
                        ? "https://www.facebook.com/profile.php?id=61578331262862"
                        : "https://www.instagram.com/ali_imran_2007/"
                    }
                    className="flex items-center justify-center"
                  >
                    <img src={icon} alt="" className="w-7 h-7" />
                  </a>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </aside>
  );
};

export default Sidebar;
