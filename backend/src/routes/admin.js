const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Listing } = require("../db/models");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};

// BAN (DELETE) A USER

router.delete("/user/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const userToBan = await User.findByPk(id);
    if (!userToBan) {
      return res.status(404).json({ error: "User not found" });
    }

    await userToBan.destroy();
    return res.json({ message: "User banned (deleted)" });
  } catch (err) {
    console.error("Error banning user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// FORCE DELETE ANY LISTING

router.delete("/listing/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const listingToDelete = await Listing.findByPk(id);
    if (!listingToDelete) {
      return res.status(404).json({ error: "Listing not found" });
    }

    await listingToDelete.destroy();
    return res.json({ message: "Listing forcibly deleted" });
  } catch (err) {
    console.error("Error deleting listing (admin):", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// --- REGISTER NEW ADMIN ---
router.post("/register", async (req, res) => {
  try {
    const { email, password, secret } = req.body;

    if (secret !== ADMIN_SECRET) {
      return res.status(403).json({ error: "Invalid secret code" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await User.create({
      username: email,   
      email,
      password: hash,
      role: "admin",
    });

    return res.status(201).json({
      id:    admin.id,
      email: admin.email,
      role:  admin.role,
    });
  } catch (err) {
    console.error("Error in /admin/register:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
