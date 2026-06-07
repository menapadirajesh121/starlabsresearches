const router   = require("express").Router();
const Research = require("../models/Research");
const auth     = require("../middleware/auth");

// Public
router.get("/", async (req, res) => {
  const { tag, featured } = req.query;
  const filter = {};
  if (tag)      filter.tags    = { $regex: tag, $options: "i" };
  if (featured) filter.featured = true;
  const items = await Research.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Research.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Research not found" });
  res.json(item);
});

// Admin protected
router.post("/", auth, async (req, res) => {
  try {
    const item = await Research.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const item = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Research not found" });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Research.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Research not found" });
  res.json({ message: "Research deleted" });
});

module.exports = router;
