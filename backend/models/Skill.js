const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  image: String,
  progressBar: { type: Number, min: 0, max: 100 }
});

module.exports = mongoose.model('Skill', skillSchema);
