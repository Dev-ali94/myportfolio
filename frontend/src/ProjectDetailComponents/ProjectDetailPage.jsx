import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../HomePages/Sidebar';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!project) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className='flex flex-col lg:flex-row sm:flex-col space-x-4 space-y-4 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white min-h-screen p-4'>
      <Sidebar />
      <main className="bg-[#161B22] p-2 w-full rounded-2xl border-gray-700">
        <div className="text-white space-y-10 overflow-y-auto max-h-[100vh] p-2">

          {project.hero && (
            <motion.div {...fadeUp} className='bg-gray-900 w-full rounded-3xl mb-8 shadow-md'>
              <div className="relative">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[500px] object-cover rounded-3xl mb-8"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-16">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black mb-4">{project.hero.title}</h1>
                  <p className="text-base sm:text-lg md:text-2xl text-black mb-6">{project.hero.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.hero.button1 && (
                      <a href={project.hero.button1} className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-black font-semibold transition">
                        Source code
                      </a>
                    )}
                    {project.hero.button2 && (
                      <a href={project.hero.button2} className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-black font-semibold transition">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div {...fadeUp} className="bg-gray-900 flex flex-col p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">Project Overview</h3>
            <div className="mb-8 bg-gray-800 p-4 rounded-lg hover:shadow-2xl breake-words transition-all duration-300">
              <p>{project.overview.description}</p>
            </div>

            {project.overview?.goals?.length > 0 && (
              <div className="mb-8 bg-gray-800 p-4 rounded-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">Project Goals</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-5">
                  {project.overview.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.overview?.timeline?.length > 0 && (
              <div className="mb-8 bg-gray-800 p-4 rounded-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">Project Timeline</h3>
                {project.overview.timeline.map((timelineEntry, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg mb-6 flex flex-row items-center space-x-5"
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${timelineEntry.category === 'complete' ? 'bg-green-500' : 'bg-red-500'}`}
                    ></div>
                    <div>
                      <h4 className="font-semibold text-lg">{timelineEntry.title}</h4>
                      <p className="text-sm">{timelineEntry.subtitle}</p>
                      <p className="text-xs text-gray-400">{timelineEntry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {project.features?.length > 0 && (
            <motion.div {...fadeUp} className="bg-gray-900 p-6 rounded-3xl">
              <h3 className="text-3xl font-bold mb-12">Project Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature, index) => (
                  <motion.div {...fadeUp} key={index} className="bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                    {feature.image && (
                      <div className="mb-4 w-16 h-16 bg-white rounded-2xl flex justify-center items-center overflow-hidden shadow-md">
                        <img src={feature.image} alt={`Feature ${index}`} className="w-12" />
                      </div>
                    )}
                    <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-300">{feature.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {project.specialfeature && (
            <motion.div {...fadeUp} className="bg-gray-900 p-6 rounded-3xl">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="text-3xl font-semibold mb-4">{project.specialfeature.title}</h4>
                  <p className="text-lg text-gray-300 mb-6">{project.specialfeature.description}</p>
                  <ul className="space-y-2">
                    {project.specialfeature.points?.length > 0 ? (
                      project.specialfeature.points.map((point, i) => (
                        <li key={i} className="text-sm text-gray-400">{point}</li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-400">No points added yet</li>
                    )}
                  </ul>
                </div>
                {project.specialfeature.image && (
                  <div className="flex-1 flex justify-center items-center">
                    <img src={project.specialfeature.image} alt="Special" className="rounded-2xl max-h-[300px] object-contain" />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {project.projectProcess?.length > 0 && (
            <motion.div {...fadeUp} className="bg-gray-900 p-6 rounded-3xl">
              <h3 className="text-3xl font-bold mb-8">Project Process</h3>
              {project.projectProcess.map((process, index) => (
                <motion.div {...fadeUp}
                  key={index}
                  className={`flex flex-col lg:flex-row ${process.catogre === 'right' ? 'lg:flex-row-reverse' : ''} gap-6 mb-12 items-center`}
                >
                  <div className="flex flex-row items-center w-full gap-4 sm:w-1/3">
                    <div className="p-3 bg-white rounded-full flex-shrink-0">
                      <img src={process.image} alt={`Phase ${index}`} className="w-16" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white">{process.phase}</h4>
                      <p className="text-gray-400 text-sm">{process.duration}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-2/3 bg-gray-800 p-4 sm:p-6 rounded-xl">
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">{process.description}</p>
                    <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Tools and technologies</h5>
                    <ul className="flex flex-wrap gap-2">
                      {process.tools.map((tool, i) => (
                        <li key={i} className="bg-gray-900 text-white text-xs sm:text-sm px-3 py-1 rounded-full">{tool}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {project.technicalstack?.length > 0 && (
            <motion.div {...fadeUp} className="bg-gray-900 p-6 rounded-2xl">
              <h3 className="text-3xl font-bold mb-8">Technical Stack</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {project.technicalstack.map((tech, index) => (
                  <motion.div {...fadeUp} key={index} className="bg-gray-800 rounded-xl p-5 shadow-md text-center">
                    {tech.image && (
                      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
                        <img src={tech.image} alt={`Tech ${index}`} className="w-10 h-10 object-contain" />
                      </div>
                    )}
                    <h4 className="text-lg font-semibold text-white">{tech.title}</h4>
                    <p className="text-sm text-gray-400">{tech.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {project.projectgallery?.length > 0 && (
            <motion.div {...fadeUp} className="bg-gray-900 p-6 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-8">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.projectgallery.map((imgObj, index) => (
                  <motion.div {...fadeUp} key={index} className="rounded-xl overflow-hidden shadow-lg bg-gray-800">
                    <img
                      src={imgObj.image}
                      alt={`Gallery ${index}`}
                      className="w-full h-64 object-container hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;






