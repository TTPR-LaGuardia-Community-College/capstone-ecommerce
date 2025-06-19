const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Wishlist, Listing, User } = require("../db/models");

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

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Listing,
          as: "listing",
          include: [
            {
              model: User,
              as: "owner",
              attributes: ["id", "username", "email"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(items);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { listingId } = req.body;

    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const existing = await Wishlist.findOne({ where: { userId, listingId } });
    if (existing) {
      return res.status(400).json({ error: "Already in wishlist" });
    }

    const newItem = await Wishlist.create({ userId, listingId });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:listingId", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { listingId } = req.params;

    const wishlistItem = await Wishlist.findOne({ where: { userId, listingId } });
    if (!wishlistItem) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    await wishlistItem.destroy();
    return res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
