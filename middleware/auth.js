const basicAuth = require("basic-auth");
const pool = require("../models/db");

module.exports = async (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    return res.status(401).json({ error: "Missing credentials" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [credentials.name, credentials.pass]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Auth error" });
  }
};