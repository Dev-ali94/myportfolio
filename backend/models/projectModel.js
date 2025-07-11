const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    image: String ,
    type: { type: String, default: "project" },
    slug: { type: String, unique: true },
    hero: {
      imagePreview: String,
      title: String,
      subtitle: String,
      button1: String,
      button2: String,
    },
    overview: {
      description: String,
      goals: [String],
      timeline: [
        {
          id: String,
          title: String,
          subtitle: String,
          date: String,
          category: { type: String, default: 'pending' },
        },
      ],
    },
    features: [
      {
        title: String,
        subtitle: String,
        image: String,
      },
    ],
    specialfeature: {
      title: String,
      description: String,
      points: [String],
      image: String,
    },
    projectProcess: [
      {
        image: String,
        phase: String,
        catogre: String,
        description: String,
        duration: String,
        tools: [String],
      },
    ],
    technicalstack: [
      {
        title: String,
        subtitle: String,
        image: String,
      },
    ],
    projectgallery: [
      {
        image: String,
      },
    ],
  },
  { timestamps: true }
);

projectSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
