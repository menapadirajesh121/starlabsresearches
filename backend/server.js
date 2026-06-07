require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://starlabsresearches.vercel.app",
  "https://starlabsresearches.com",
  "https://www.starlabsresearches.com",
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) || /\.onrender\.com$/.test(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.get("/api/ping", (_, res) => res.json({ ok: true }));
app.use("/api/blogs",    require("./routes/blog"));
app.use("/api/research", require("./routes/research"));
app.use("/api/admin",    require("./routes/admin"));
app.use("/api/seed",     require("./routes/seed"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const { runSeed } = require("./routes/seed");

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Add it as an environment variable on Render.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Atlas connected!");
    await runSeed(true);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => { console.error("❌ DB connection failed:", err.message); process.exit(1); });
