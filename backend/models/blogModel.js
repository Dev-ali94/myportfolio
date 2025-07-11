const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  image: String ,
  author: { type: String, required: true },
  authorImage: String,
  date: { type: String, required: true },
  type: { type: String, default: "blog" },
  slug: { type: String, unique: true },
  sections: [
    {
      title: String,
      subsections: [
        {
          subtitle: String,
          content: String,
        },
      ],
    },
  ],
}, { timestamps: true });

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
