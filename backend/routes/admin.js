const router = require("express").Router();
const jwt    = require("jsonwebtoken");
const auth   = require("../middleware/auth");
const Blog   = require("../models/Blog");
const Research = require("../models/Research");

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

// GET /api/admin/stats  — dashboard counts
router.get("/stats", auth, async (req, res) => {
  const [blogs, research] = await Promise.all([
    Blog.countDocuments(),
    Research.countDocuments(),
  ]);
  res.json({ blogs, research });
});

module.exports = router;
