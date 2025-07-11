const Skill = require('../models/Skill');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// GET ALLSKILL
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

// CREATE SKILL
exports.createSkill = async (req, res) => {
  try {
    const { title, description, category, progressBar } = req.body;
    const image = req.body.image || ''; 

    const skill = new Skill({
      title,
      description,
      category,
      progressBar,
      image
    });
    await skill.save();
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create skill' });
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid skill ID' });
  }

  try {
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // Remove image file if it exists
    if (skill.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', skill.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn('Failed to delete image file:', err.message);
        }
      });
    }

    await Skill.findByIdAndDelete(id);

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error.message);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};
