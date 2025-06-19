const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Listing } = require("../db/models");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

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

module.exports = router;
