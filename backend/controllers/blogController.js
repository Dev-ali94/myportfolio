const Blog = require("../models/blogModel");
const slugify = require("slugify");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, category, author, date, sections } = req.body;
    const image = req.body.image || '';
    const authorImage = req.body.authorImage || '';
    
    let parsedSections;
    try {
      parsedSections = typeof sections === "string" ? JSON.parse(sections) : sections;
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid format for sections" });
    }

    if (!title || !excerpt || !category || !author || !date || !parsedSections) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ error: "A blog with this title already exists." });
    }

    const blog = new Blog({
      title,
      excerpt,
      category,
      author,
      date,
      image,
      authorImage,
      sections: parsedSections,
      slug,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation error:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
};


// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ type: "blog" }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// GET BLOG BY SLUG
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({message :" Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err.message);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
