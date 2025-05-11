const pool = require("../models/db");
const { validateParticipant } = require("../validation/validate");

exports.addParticipant = async (req, res) => {
  const { error, value } = validateParticipant(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { participant, work, home } = value;

  try {
    await pool.query("INSERT INTO participants SET ?", participant);
    await pool.query("INSERT INTO work_details SET ?, email = ?", [work, participant.email]);
    await pool.query("INSERT INTO home SET ?, email = ?", [home, participant.email]);
    res.status(201).json({ message: "Participant added" });
  } catch (err) {
    console.error("Error adding participant:", err);
    res.status(500).json({ error: "Database error" });
  }
};

exports.getAllParticipants = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM participants");
  res.json(rows);
};

exports.getAllDetails = async (req, res) => {
  const [rows] = await pool.query("SELECT firstname, lastname, email FROM participants");
  res.json(rows);
};

exports.getDetailsByEmail = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT firstname, lastname, dob FROM participants WHERE email = ?",
    [req.params.email]
  );
  res.json(rows[0] || {});
};

exports.getWorkByEmail = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT companyname, salary, currency FROM work_details WHERE email = ?",
    [req.params.email]
  );
  res.json(rows[0] || {});
};

exports.getHomeByEmail = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT country, city FROM home WHERE email = ?",
    [req.params.email]
  );
  res.json(rows[0] || {});
};

exports.deleteParticipant = async (req, res) => {
  const email = req.params.email;
  await pool.query("DELETE FROM home WHERE email = ?", [email]);
  await pool.query("DELETE FROM work_details WHERE email = ?", [email]);
  await pool.query("DELETE FROM participants WHERE email = ?", [email]);
  res.json({ message: "Participant deleted" });
};

exports.updateParticipant = async (req, res) => {
  const email = req.params.email;
  const { error, value } = validateParticipant(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { participant, work, home } = value;

  await pool.query("UPDATE participants SET ? WHERE email = ?", [participant, email]);
  await pool.query("UPDATE work_details SET ? WHERE email = ?", [work, email]);
  await pool.query("UPDATE home SET ? WHERE email = ?", [home, email]);

  res.json({ message: "Participant updated" });
};

