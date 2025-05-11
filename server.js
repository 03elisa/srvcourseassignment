require("dotenv").config();
const express = require("express");
const app = express();
const participantRoutes = require("./routes/participants");
const authMiddleware = require("./middleware/auth");
const pool = require("./models/db");


pool.query("SELECT 1")
  .then(() => console.log("✅ Connected to MySQL"))
  .catch((err) => console.error("❌ MySQL connection failed:", err.message));


app.use(express.json());


app.use(authMiddleware);


app.use("/participants", participantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
