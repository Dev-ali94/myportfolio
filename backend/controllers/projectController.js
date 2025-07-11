const Project = require("../models/projectModel");
const slugify = require("slugify");
const mongoose = require('mongoose');

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      hero,
      overview,
      features,
      specialfeature,
      projectProcess,
      technicalstack,
      projectgallery,
    } = req.body;

    if (!title || !category || !overview || !features || !specialfeature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const image = req.body.image || ''

    const parsedHero = typeof hero === "string" ? JSON.parse(hero) : hero;
    const parsedOverview = typeof overview === "string" ? JSON.parse(overview) : overview;
    const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    const parsedSpecialFeature = typeof specialfeature === "string" ? JSON.parse(specialfeature) : specialfeature;
    const parsedProjectProcess = typeof projectProcess === "string" ? JSON.parse(projectProcess) : projectProcess;
    const parsedTechStack = typeof technicalstack === "string" ? JSON.parse(technicalstack) : technicalstack;
    const parsedGallery = typeof projectgallery === "string" ? JSON.parse(projectgallery) : projectgallery;

    const slug = slugify(title, { lower: true, strict: true });

    const newProject = new Project({
      title,
      description,
      category,
      image,
      hero: parsedHero,
      overview: parsedOverview,
      features: parsedFeatures,
      specialfeature: parsedSpecialFeature,
      projectProcess: parsedProjectProcess,
      technicalstack: parsedTechStack,
      projectgallery: parsedGallery,
      slug,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Project creation error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// GET ALL PROJECTS
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ type: "project" }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// GET PROJECT BY SLUG
exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
};