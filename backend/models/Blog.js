const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    slug:     { type: String, required: true, unique: true },
    title:    { type: String, required: true },
    category: { type: String, required: true },
    excerpt:  { type: String, required: true },
    content:  { type: String, required: true },
    image:    { type: String, default: "" },
    tags:     { type: [String], default: [] },
    readTime: { type: String, default: "5 min read" },
    date:     { type: String, default: () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
