import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";


const ProjectCreate = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [hero, setHero] = useState({ imagePreview: '', title: '', subtitle: '', button1: '', button2: '' });
  const [overview, setOverview] = useState({ description: '', goals: [], timeline: [{ id: '', title: '', subtitle: '', date: '', category: 'pending' },], });
  const [features, setFeatures] = useState([{ title: '', subtitle: '', image: '', imagePreview: '' },]);
  const [specialfeature, setspecialfeature] = useState({ description: '', title: '', points: [''], image: '', imagePreview: '' });
  const [projectProcess, setProjectProcess] = useState([{ image: '', phase: '', catogre: '', imagePreview: '', description: '', duration: '', tools: [] }]);
  const [technicalstack, settechnicalstack] = useState([{ title: '', subtitle: '', image: '', imagePreview: '' },]);
  const [projectgallery, setprojectgallery] = useState([{ image: '', imagePreview: '' },]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const generateSlug = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  // all functions for upload image in all section
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      console.log("Cloudinary response:", res.data);
      const imageUrl = res.data.secure_url;
      setImage(imageUrl);
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Image upload failed.");
    }
  };
  const uploadFeatureImage = async (file, featureIndex, setFeatures) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");
    try {
      setFeatures(prevFeatures =>
        prevFeatures.map((feature, idx) =>
          idx === featureIndex
            ? { ...feature, imagePreview: URL.createObjectURL(file) }
            : feature
        )
      );
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      console.log("Cloudinary response:", res.data);
      const imageUrl = res.data.secure_url;
      setFeatures(prevFeatures =>
        prevFeatures.map((feature, idx) =>
          idx === featureIndex
            ? { ...feature, image: imageUrl }
            : feature
        )
      );

    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Image upload failed.");
      setFeatures(prevFeatures =>
        prevFeatures.map((feature, idx) =>
          idx === featureIndex
            ? { ...feature, imagePreview: '' }
            : feature
        )
      );
    }
  };
  const uploadspecialFeatureImage = async (file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setspecialfeature(prev => ({
      ...prev,
      imagePreview: previewUrl
    }));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      setspecialfeature(prev => ({
        ...prev,
        image: res.data.secure_url,  
        imagePreview: previewUrl  
      }));
    } catch (err) {
      console.error("Upload error:", err);
      setspecialfeature(prev => ({
        ...prev,
        imagePreview: ''
      }));
      alert("Image upload failed. Please try again.");
    }
  };
  const uploadProcessImage = async (file, index) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProjectProcess(prev => prev.map((process, i) =>
      i === index ? { ...process, imagePreview: previewUrl } : process
    ))
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      setProjectProcess(prev => prev.map((process, i) =>
        i === index ? {
          ...process,
          image: res.data.secure_url,
          imagePreview: previewUrl
        } : process
      ));
    } catch (err) {
      console.error("Upload error:", err);
      setProjectProcess(prev => prev.map((process, i) =>
        i === index ? { ...process, imagePreview: '' } : process
      ));
      alert("Image upload failed. Please try again.");
    }
  };
  const uploadtechnicalStackImage = async (file, index) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    settechnicalstack(prev => prev.map((tech, i) =>
      i === index ? { ...tech, imagePreview: previewUrl } : tech
    ));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      settechnicalstack(prev => prev.map((tech, i) =>
        i === index ? {
          ...tech,
          image: res.data.secure_url,
          imagePreview: previewUrl
        } : tech
      ));
    } catch (err) {
      console.error("Upload error:", err);
      settechnicalstack(prev => prev.map((tech, i) =>
        i === index ? { ...tech, imagePreview: '' } : tech
      ));
      alert("Image upload failed. Please try again.");
    }
  };
  const uploadprojectgalleryImage = async (file, index) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setprojectgallery(prev => prev.map((item, i) =>
      i === index ? { ...item, imagePreview: previewUrl } : item
    ));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "protfolio-preset");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd3cwlbyy/image/upload",
        formData
      );
      setprojectgallery(prev => prev.map((item, i) =>
        i === index ? {
          ...item,
          image: res.data.secure_url,
          imagePreview: previewUrl
        } : item
      ));
    } catch (err) {
      console.error("Upload error:", err);
      setprojectgallery(prev => prev.map((item, i) =>
        i === index ? { ...item, imagePreview: '' } : item
      ));
      alert("Image upload failed. Please try again.");
    }
  };
  // project overview timeline or goal functions code
  const handleTimelineChange = (index, e) => {
    const { name, value } = e.target;
    setOverview((prevOverview) => {
      const updatedTimeline = [...prevOverview.timeline];
      updatedTimeline[index] = { ...updatedTimeline[index], [name]: value };
      return { ...prevOverview, timeline: updatedTimeline };
    });
  };
  const addTimeline = () => {
    setOverview((prevOverview) => ({
      ...prevOverview,
      timeline: [
        ...prevOverview.timeline,
        { id: uuidv4(), title: '', subtitle: '', date: '', category: 'pending' },
      ],
    }));
  };
  const removeTimeline = (index) => {
    setOverview((prevOverview) => {
      const updatedTimeline = prevOverview.timeline.filter((_, i) => i !== index);
      return { ...prevOverview, timeline: updatedTimeline };
    });
  };
  const handleAddGoal = () => {
    const trimmed = goalInput.trim();
    if (trimmed !== '') {
      setOverview(prev => ({
        ...prev,
        goals: [...prev.goals, trimmed],
      }));
      setGoalInput('');
    }
  };
  const handleRemoveGoal = (index) => {
    setOverview(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };
  // project fature all functions code
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };
  const handleAddFeature = () => {
    setFeatures([...features, { title: '', subtitle: '' }]);
  };
  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };
  // special feature all function code 
  const addPoint = () => {
    setspecialfeature(prev => ({
      ...prev,
      points: [...prev.points, '']
    }));
  };
  const removePoint = (index) => {
    setspecialfeature(prev => {
      const updatedPoints = [...prev.points];
      updatedPoints.splice(index, 1);
      return { ...prev, points: updatedPoints };
    });
  };
  // project process all function code 
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...projectProcess];
    updated[index][name] = value;
    setProjectProcess(updated);
  };
  const addProcessSection = () => {
    setProjectProcess([
      ...projectProcess,
      { image: '', imagePreview: '', phase: '', catogre: '', description: '', duration: '', tools: [] }
    ]);
  };
  const removeProcessSection = (index) => {
    const updated = [...projectProcess];
    updated.splice(index, 1);
    setProjectProcess(updated);
  };
  const handleToolInputChange = (index, value) => {
    const updated = [...projectProcess];
    updated[index].newTool = value;
    setProjectProcess(updated);
  };
  const addToolToProcess = (index) => {
    const updated = [...projectProcess];
    const tool = updated[index].newTool?.trim();
    if (tool) {
      updated[index].tools = [...(updated[index].tools || []), tool];
      updated[index].newTool = '';
      setProjectProcess(updated);
    }
  };
  const removeToolFromProcess = (pIndex, tIndex) => {
    const updated = [...projectProcess];
    updated[pIndex].tools.splice(tIndex, 1);
    setProjectProcess(updated);
  };
  // project technical stack all function code 
  const handletechnicalStackChange = (index, field, value) => {
    const updatedtechnicalstack = [...technicalstack];
    updatedtechnicalstack[index][field] = value;
    settechnicalstack(updatedtechnicalstack);
  };
  const handleAddtechnicalStack = () => {
    settechnicalstack([...technicalstack, { title: '', subtitle: '' }]);
  };
  const handleRemovetechnicalstack = (index) => {
    const updatedtechnicalstack = technicalstack.filter((_, i) => i !== index);
    settechnicalstack(updatedtechnicalstack); 
  };
  // project gallery all function code
  const handleAddprojectgallery = () => {
    setprojectgallery([...projectgallery, { image: '' }]); 
  };
  const handleRemoveprojectgallery = (index) => {
    const updatedprojectgallery = projectgallery.filter((_, i) => i !== index);
    setprojectgallery(updatedprojectgallery); 
  };
  // Corrected handleSubmit function with async keyword
  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = generateSlug(title);
    const projectData = {
      title,
      slug,
      description,
      category,
      image,
      overview,
      hero,
      features,
      specialfeature,
      projectProcess,
      technicalstack,
      projectgallery
    };

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/projects`, projectData);
      alert('Project created!');
      fetchProjects();
      setTitle('');
      setDescription('');
      setCategory('');
      setImage('');
      setImagePreview('');
      setHero({ title: '', subtitle: '', button1: '', button2: '', });
      setOverview({ goals: [], description: '', timeline: [{ id: '', title: '', subtitle: '', date: '', category: 'pending' }], });
      setFeatures([{ title: '', subtitle: '', }]);
      setspecialfeature({ title: '', description: '', points: [''], image: '', })
      setProjectProcess([{ image: '', catogre: '', phase: '', duration: '', description: '', tools: [], }])
      settechnicalstack([{ title: '', subtitle: '', image: '', }]);
      setprojectgallery([{ image: '', }]);
    } catch (error) {
      console.error(error);
      alert('Project creation failed!');
    }
  };

  return (
    <div>
      <div className="p-6 bg-gray-800 min-h-screen text-white flex flex-col items-center rounded-2xl">
        <h2 className="text-4xl font-bold mb-10">Create a New Project</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-7xl flex flex-col gap-8 bg-gray-900 p-4 rounded-3xl">
          {/* Project Details */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold mb-6">Project Card</h3>
            <div className="flex flex-col md:flex-row gap-8">

              <div className="flex flex-col gap-5 w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="web-dev">full stack</option>
                  <option value="design">Frontend</option>
                    <option value="api">REST API</option>
                  <option value="chatbot">Chatbot</option>
                </select>
              </div>
              <div className="bg-gray-900 p-10 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full md:w-1/2">
                <h3 className="text-3xl font-bold text-gray-100">Upload Project Image</h3>
                <div
                  className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-green-500 bg-gray-700 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center"
                  onClick={() => document.getElementById('projectImage').click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Project" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <span className="text-sm">Click to</span>
                      <span className="text-sm">Upload Image</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="projectImage"
                  onChange={(e) => handleImageUpload(e.target.files[0], setImage, setImagePreview)}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          {/* hero section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col gap-6 w-full">
            <h3 className="text-3xl font-bold text-gray-100">Hero Section</h3>
            <input
              type="text"
              placeholder="Hero Title"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Hero Subtitle"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Button 1 Link (e.g., https://yourlink.com)"
              value={hero.button1}
              onChange={(e) => setHero({ ...hero, button1: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Button 2 Link (optional)"
              value={hero.button2}
              onChange={(e) => setHero({ ...hero, button2: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* project overview section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full space-y-8">
            <h2 className="font-bold text-3xl mb-6">project overview</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-gray-900 p-6 rounded-xl w-full md:w-1/2 space-y-6">
                <div className="space-y-3">
                  <h2 className="font-bold text-2xl text-white">Project Description</h2>
                  <input
                    type="text"
                    placeholder="Project Description"
                    value={overview.description}
                    onChange={(e) => setOverview({ ...overview, description: e.target.value })}
                    className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-h-70 overflow-y-auto">
                  <h3 className="text-2xl font-semibold mb-6">Goals</h3>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Add a goal"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddGoal}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Add Goal
                    </button>
                    <ul className="mt-4">
                      {overview.goals.map((goal, index) => (
                        <li key={index} className="flex mb-2 justify-between items-center text-white p-2 rounded-lg bg-gray-900">
                          {goal}
                          <button
                            type="button"
                            onClick={() => handleRemoveGoal(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl w-full md:w-1/2 space-y-6 max-h-[500px] overflow-y-auto">
                <h2 className="font-bold text-2xl text-white">Project Timeline</h2>

                {overview.timeline.map((timelineEntry, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={timelineEntry.title}
                      onChange={(e) => handleTimelineChange(index, e)}
                      placeholder="Title"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white"
                    />
                    <input
                      type="text"
                      name="subtitle"
                      value={timelineEntry.subtitle}
                      onChange={(e) => handleTimelineChange(index, e)}
                      placeholder="Subtitle"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white"
                    />
                    <input
                      type="text"
                      name="date"
                      value={timelineEntry.date}
                      onChange={(e) => handleTimelineChange(index, e)}
                      placeholder="Date"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white"
                    />
                    <select
                      name="category"
                      value={timelineEntry.category}
                      onChange={(e) => handleTimelineChange(index, e)}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>

                    <div className="flex gap-2">
                      <button
                        onClick={() => removeTimeline(index)}
                        className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white font-semibold"
                      >
                        Remove
                      </button>
                      {index === overview.timeline.length - 1 && (
                        <button
                          onClick={addTimeline}
                          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg text-white font-semibold"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* keyfeature & specialfeature section */}
          <div className="flex flex-col bg-gray-800 p-8 rounded-2xl h-210">
            <h2 className="font-bold text-3xl mb-6">project overview</h2>
            <div className="flex flex-row space-x-4 rounded-2xl">
              {/* key feature section Inputs */}
              <div className="bg-gray-900 p-5 rounded-2xl shadow-lg flex flex-col gap-8 w-full max-h-180 overflow-y-auto">
                <h3 className="text-3xl font-bold text-gray-100 text-start">Feature Section</h3>
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-2xl flex flex-col gap-6 shadow-md">
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Feature Subtitle"
                      value={feature.subtitle}
                      onChange={(e) => handleFeatureChange(index, 'subtitle', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className="w-full bg-gray-900 p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-850"
                        onClick={() => document.getElementById(`featureImage-${index}`).click()}
                      >
                        <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-dashed border-green-400 flex items-center justify-center overflow-hidden">
                          {feature.imagePreview || feature.image ? (
                            <img
                              src={feature.imagePreview || feature.image}
                              alt={`Feature ${index}`}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-gray-400 text-center text-sm">Upload Image</span>
                          )}
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                          {feature.imagePreview ? "Image selected" : "Click to upload image"}
                        </p>
                      </div>
                      <input
                        type="file"
                        id={`featureImage-${index}`}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            uploadFeatureImage(e.target.files[0], index, setFeatures);
                          }
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                    <div className="flex flex-row w-full gap-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition flex-1 flex items-center justify-center gap-2"
                      >
                        <span>Remove Feature</span>
                      </button>
                      {index === features.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex-1 flex items-center justify-center gap-2"
                        >
                          <span>Add Feature</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* special feature section Inputs */}
              <div className="bg-gray-900 p-5 rounded-2xl shadow-lg w-full flex flex-col h-180">
                <h3 className="text-3xl font-bold text-gray-100 mb-8">Special feature Section</h3>
                <div className="bg-gray-800 p-5 rounded-2xl shadow-lg flex flex-col w-full space-y-4">
                  <div className="bg-gray-900 flex flex-col space-y-4 p-4 rounded-2xl">
                    <input
                      type="text"
                      placeholder="Special Feature Title"
                      value={specialfeature.title}
                      onChange={(e) => setspecialfeature({ ...specialfeature, title: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Special Feature Description"
                      value={specialfeature.description}
                      onChange={(e) => setspecialfeature({ ...specialfeature, description: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div
                      className="w-full bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-700"
                      onClick={() => document.getElementById('specialfeatureImage').click()}
                    >
                      <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-dashed border-green-400 flex items-center justify-center overflow-hidden">
                        {specialfeature.imagePreview || specialfeature.image ? (
                          <img
                            src={specialfeature.imagePreview || specialfeature.image}
                            alt="Special Feature"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-gray-400 text-center text-sm">Upload Image</span>
                        )}
                      </div>
                      <p className="mt-2 text-gray-400 text-sm">
                        {specialfeature.imagePreview ? "Image selected" : "Click to upload"}
                      </p>
                    </div>
                    <input
                      type="file"
                      id="specialfeatureImage"
                      onChange={(e) => e.target.files?.[0] && uploadspecialFeatureImage(e.target.files[0])}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  <div className="space-y-4 bg-gray-900 p-4 rounded-2xl max-h-50 overflow-y-auto">
                    <h4 className="text-lg text-gray-100">Special Points</h4>
                    {specialfeature.points.map((point, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder={`Point ${index + 1}`}
                          value={point}
                          onChange={(e) => {
                            const updatedPoints = [...specialfeature.points];
                            updatedPoints[index] = e.target.value;
                            setspecialfeature({ ...specialfeature, points: updatedPoints });
                          }}
                          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {specialfeature.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint(index)}
                            className="text-red-500 hover:text-red-400 p-2"
                            aria-label="Remove point"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPoint}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full transition-colors"
                    >
                      Add Another Point
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project Process Section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md overflow-y-auto max-h-250 ">
            <h3 className="text-2xl font-semibold mb-6">Project Process</h3>
            {projectProcess.map((process, index) => (
              <div
                key={index}
                className="bg-gray-900 flex flex-col gap-8 mb-5 p-4 rounded-2xl  "
              >
                <div className="flex flex-col gap-5 w-full">
                  <input
                    type="text"
                    placeholder="Project Phase"
                    name="phase"
                    value={process.phase}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={process.description}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    name="duration"
                    value={process.duration}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a tool"
                        value={process.newTool || ''}
                        onChange={(e) => handleToolInputChange(index, e.target.value)}
                        className="p-3 flex-1 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => addToolToProcess(index)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {process.tools.map((tool, tIndex) => (
                        <span
                          key={tIndex}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white flex items-center"
                        >
                          {tool}
                          <button
                            type="button"
                            onClick={() => removeToolFromProcess(index, tIndex)}
                            className="ml-2 text-red-400 hover:text-red-600"
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <select
                    name="catogre"
                    value={process.catogre}
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="bg-gray-800 p-10 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full">
                  <h3 className="text-3xl font-bold text-gray-100">Upload Project Image</h3>
                  <div
                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-green-500 bg-gray-700 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center"
                    onClick={() => document.getElementById(`projectProcessImage-${index}`).click()}
                  >
                    {process.imagePreview ? (
                      <img
                        src={process.imagePreview}
                        alt="Project"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="text-sm">Click to</span>
                        <span className="text-sm">Upload Image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id={`projectProcessImage-${index}`}
                    onChange={(e) => uploadProcessImage(e.target.files[0], index)}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-row w-full space-x-3">
                  <button
                    type="button"
                    onClick={() => removeProcessSection(index)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition w-[50%]"
                  >
                    Remove Section
                  </button>
                  <button
                    type="button"
                    onClick={addProcessSection}
                    className="bg-blue-500 text-white font-semibold p-2 rounded-lg transition w-[50%]"
                  >
                   Add New Section
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* technical satck  section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Technical Stack</h3>
            </div>
            {technicalstack.map((tech, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-2xl flex flex-col gap-6 shadow-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Technology Title</label>
                    <input
                      type="text"
                      placeholder=" React,Node.js"
                      value={tech.title}
                      onChange={(e) => handletechnicalStackChange(index, 'title', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Subtitle</label>
                    <input
                      type="text"
                      placeholder="Add subtitle"
                      value={tech.subtitle}
                      onChange={(e) => handletechnicalStackChange(index, 'subtitle', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-full bg-gray-900 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-850 group"
                    onClick={() => document.getElementById(`technicalImage-${index}`).click()}
                  >
                    <div className="relative w-32 h-32 rounded-full bg-gray-800 border-4 border-dashed border-green-400 group-hover:border-green-300 flex items-center justify-center overflow-hidden transition-colors">
                      {tech.imagePreview || tech.image ? (
                        <img
                          src={tech.imagePreview || tech.image}
                          alt={`${tech.title || 'Tech'} logo`}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-gray-400 text-sm mt-2 block">Click to upload logo</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-gray-400">
                      {tech.imagePreview ? "Logo selected" : "Recommended: 300×300 transparent PNG"}
                    </p>
                  </div>
                  <input
                    type="file"
                    id={`technicalImage-${index}`}
                    onChange={(e) => e.target.files?.[0] && uploadtechnicalStackImage(e.target.files[0], index)}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div className="flex justify-between gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => handleRemovetechnicalstack(index)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-1/2 flex items-center justify-center gap-2"
                    disabled={technicalstack.length <= 1}
                  >
                    <span>Remove Technology</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddtechnicalStack}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-1/2 flex items-center justify-center gap-2"
                  >
                    <span>Add Technology</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* project gallery  section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md overflow-y-auto max-h-[600px]">
            <h3 className="text-2xl font-semibold mb-6">project gallery</h3>
            {projectgallery.map((item, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-2xl flex flex-col gap-6 shadow-md mb-4">
                <div
                  className="w-full bg-gray-900 p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all"
                  onClick={() => document.getElementById(`projectImage-${index}`).click()}
                >
                  <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-dashed border-green-400 flex items-center justify-center overflow-hidden">
                    {item.imagePreview ? (
                      <img
                        src={item.imagePreview}
                        alt={`projectgallery ${index}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-center text-sm">Upload Image</span>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  id={`projectImage-${index}`}
                  onChange={(e) => e.target.files?.[0] && uploadprojectgalleryImage(e.target.files[0], index)}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex flex-row w-full space-x-3">
                  <button
                    type="button"
                    onClick={() => handleRemoveprojectgallery(index)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition w-[50%]"
                    disabled={projectgallery.length <= 1}
                  >
                    Remove Feature
                  </button>
                  <button
                    type="button"
                    onClick={handleAddprojectgallery}
                    className="bg-blue-500 text-white font-semibold p-3 rounded-lg transition w-[50%]"
                  >
                    Add New Feature
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-xl font-semibold w-full mt-6"
          >
            Create project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreate;
