import { useState, useEffect } from "react";
import axios from "axios";

const SkillCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/skills`);
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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



  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = {
      title,
      description,
      category,
      image,
      progressBar,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/skills`, skillData);
      alert("Skill created!");
      fetchSkills();
      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
      setProgressBar(0);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      alert("Skill creation failed!");
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white flex flex-col items-center rounded-2xl">
      <h2 className="text-4xl font-bold mb-10">Create a New Skill</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-7xl flex flex-col gap-8 bg-gray-900 p-4 rounded-3xl">
        {/* Skill Details */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6">Skill Details</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Skill Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Skill Description"
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
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="tools">Tools</option>
              </select>
              <input
                type="number"
                placeholder="Progress (0-100)"
                value={progressBar}
                onChange={(e) => setProgressBar(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
            </div>
            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-100">Upload Skill Image</h3>
              <div
                className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-green-500 bg-gray-700 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center"
                onClick={() => document.getElementById("skillImage").click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Skill" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-sm">Click to</span>
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="skillImage"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-xl font-semibold w-full mt-6"
        >
          Create Skill
        </button>
      </form>
    </div>
  );
};

export default SkillCreate;