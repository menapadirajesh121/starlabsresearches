const router      = require("express").Router();
const Blog        = require("../models/Blog");
const Research    = require("../models/Research");
const blogData    = require("../data/blogData.json");
const researchData = require("../data/researchData.json");

async function runSeed(onlyIfEmpty = false) {
  if (onlyIfEmpty) {
    const [b, r] = await Promise.all([Blog.countDocuments(), Research.countDocuments()]);
    if (b > 0 || r > 0) return;
    console.log("🌱 DB empty — auto-seeding...");
  }
  const blogs = blogData.posts.map((p) => ({
    slug:     p.slug,
    title:    p.title,
    category: p.category,
    excerpt:  p.excerpt,
    content:  p.content,
    image:    p.image,
    tags:     p.tags,
    readTime: p.readTime,
    date:     p.date,
  }));

  const research = researchData.projects.map((p, i) => ({
    title:    p.title,
    desc:     "Implementing advanced techniques for large-scale cosmological analysis.",
    image:    p.image,
    tags:     p.tags,
    author:   p.author,
    doi:      researchData.publications[i]?.doi  || "",
    type:     researchData.publications[i]?.type || "Preprint",
    stack:    researchData.featured.stack || [],
    featured: i === 0,
  }));

  await Blog.deleteMany({});
  await Research.deleteMany({});
  await Blog.insertMany(blogs);
  await Research.insertMany(research);

  return { blogs: blogs.length, research: research.length };
}

// POST /api/seed  — manual trigger from admin
router.post("/", async (req, res) => {
  try {
    const result = await runSeed();
    res.json({ message: `✅ Seeded ${result.blogs} blog posts and ${result.research} research items.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/seed/check  — auto-seed if DB is empty
router.get("/check", async (req, res) => {
  try {
    const [blogCount, researchCount] = await Promise.all([
      Blog.countDocuments(),
      Research.countDocuments(),
    ]);
    if (blogCount === 0 && researchCount === 0) {
      const result = await runSeed();
      return res.json({ seeded: true, message: `Auto-seeded ${result.blogs} blogs and ${result.research} research items.` });
    }
    res.json({ seeded: false, blogs: blogCount, research: researchCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
module.exports.runSeed = runSeed;
