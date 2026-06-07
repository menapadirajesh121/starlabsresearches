require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://starlabsresearches.vercel.app",
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected!");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => { console.error("❌ DB connection failed:", err.message); process.exit(1); });
