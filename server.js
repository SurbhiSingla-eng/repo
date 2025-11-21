const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", referralRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running (in-memory mode, no MongoDB)");
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (no MongoDB)`);
});
