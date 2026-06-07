const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true },
    desc:     { type: String, required: true },
    image:    { type: String, default: "" },
    tags:     { type: [String], default: [] },
    author:   { type: String, default: "" },
    doi:      { type: String, default: "" },
    type:     { type: String, enum: ["Journal Article", "Conference Paper", "Preprint", "Working Paper"], default: "Preprint" },
    stack:    { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Research", researchSchema);
