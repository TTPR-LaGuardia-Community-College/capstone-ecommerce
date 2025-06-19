// src/routes/auth.js
const express  = require("express");
const bcrypt   = require("bcrypt");
const jwt      = require("jsonwebtoken");
const { User } = require("../db/models");
require("dotenv").config();

const router      = express.Router();
const JWT_SECRET  = process.env.JWT_SECRET;

// ── REGISTER ───────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1) check dupes
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 2) hash & create
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashed,
      role: "user",
    });

    // 3) send back safe info
    return res.status(201).json({
      id:       newUser.id,
      username: newUser.username,
      email:    newUser.email,
      role:     newUser.role,
    });
  } catch (err) {
    console.error("Error in /register:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── LOGIN ──────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2) check pass
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3) sign & return token
    const payload = { id: user.id, username: user.username, role: user.role };
    const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
