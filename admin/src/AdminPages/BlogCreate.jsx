import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [sections, setSections] = useState([{ id: uuidv4(), title: '', subsections: [{ id: uuidv4(), subtitle: '', content: '' }] },]);
  const [blogs, setBlogs] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [authorImagePreview, setAuthorImagePreview] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`);
      setBlogs(res.data);
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
  const handleauthoreImageUpload = async (file) => {
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
      setAuthorImage(imageUrl);
      setAuthorImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      title,
      excerpt,
      category,
      image,
      authorImage,
      author,
      date,
      sections,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/blogs`, blogData);
      alert('Blog created!');
      fetchBlogs();
      setTitle('');
      setExcerpt('');
      setCategory('');
      setImage('');
      setAuthorImage('');
      setAuthor('');
      setDate('');
      setSections([
        {
          id: uuidv4(),
          title: '',
          subsections: [
            { id: uuidv4(), subtitle: '', content: '' }
          ]
        }
      ]);
      setImagePreview('');
      setAuthorImagePreview('');
    } catch (error) {
      console.error(error);
      alert('Blog creation failed!');
    }
  };

  const handleSectionChange = (id, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };
  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: uuidv4(),
        title: '',
        subsections: [
          { id: uuidv4(), subtitle: '', content: '' }
        ],
      },
    ]);
  };
  const handleSubsectionChange = (sectionId, subsectionId, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            subsections: section.subsections.map((subsection) =>
              subsection.id === subsectionId
                ? { ...subsection, [field]: value }
                : subsection
            ),
          }
          : section
      )
    );
  };
  const addSubsection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            subsections: [
              ...section.subsections,
              { id: uuidv4(), subtitle: '', content: '' },
            ],
          }
          : section
      )
    );
  };
  const removeSubsection = (sectionId, subsectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            subsections: section.subsections.filter(
              (subsection) => subsection.id !== subsectionId
            ),
          }
          : section
      )
    );
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white flex flex-col items-center rounded-2xl">
      <h2 className="text-4xl font-bold mb-10"> Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-7xl flex flex-col gap-8 bg-gray-900 p-4 rounded-3xl">
        {/* Blog Details */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6"> Blog Details</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Add Description"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="web-dev">Web Development</option>
                <option value="ai-chatbot">AI Chatbot</option>
                <option value="machine-learning">Machine Learning</option>
              </select>
            </div>
            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-100"> Upload Blog Image</h3>
              <div
                className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-green-500 bg-gray-700 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center"
                onClick={() => document.getElementById('blogImage').click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Blog" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-sm">Click to</span>
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="blogImage"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        {/*Authore Detail */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6">👤 Author Details</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
              <input
                type="text"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="p-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-100"> Upload Author Image</h3>
              <div
                className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-green-500 bg-gray-700 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center"
                onClick={() => document.getElementById('authorImage').click()}
              >
                {authorImagePreview ? (
                  <img src={authorImagePreview} alt="Author" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-sm">Click to</span>
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="authorImage"
                onChange={(e) => e.target.files && handleauthoreImageUpload(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
        </div>
        {/*Section or Subsection detail */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6">Blog Sections</h3>
          {sections.map((section) => (
            <div key={section.id} className="mb-6 bg-gray-900 p-5 rounded-xl">
              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                className="p-3 rounded-lg bg-gray-800 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <h4 className="text-xl font-semibold mb-4">Subsections</h4>
              {section.subsections.map((subsection) => (
                <div key={subsection.id} className="mb-4 bg-gray-700 p-4 rounded-lg">
                  <input
                    type="text"
                    placeholder="Subtitle"
                    value={subsection.subtitle}
                    onChange={(e) =>
                      handleSubsectionChange(section.id, subsection.id, 'subtitle', e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-800 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Content"
                    value={subsection.content}
                    onChange={(e) =>
                      handleSubsectionChange(section.id, subsection.id, 'content', e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-800 w-full h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex flex-row space-x-4">
                    <button
                      type="button"
                      onClick={() => addSubsection(section.id)}
                      className="bg-green-600 w-full hover:bg-green-700 px-4 py-2 rounded-lg mt-4"
                    >
                      + Add Subsection
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSubsection(section.id, subsection.id)}
                      className="mt-2 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Remove Subsection
                    </button>

                  </div>
                </div>
              ))}

              <div className="flex flex-row space-x-4">
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Remove Section
                </button>

                <button
                  type="button"
                  onClick={addSection}
                  className="bg-green-600 w-full hover:bg-green-700 px-6 py-2 rounded-lg mt-4"
                >
                  + Add Section
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-xl font-semibold w-full mt-6"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;