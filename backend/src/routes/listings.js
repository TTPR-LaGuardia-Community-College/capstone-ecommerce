// src/routes/listings.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Listing, User } = require("../db/models");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// MIDDLEWARE 

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/", async (req, res) => {
  try {
    const allListings = await Listing.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    return res.json(allListings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByPk(id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    return res.json(listing);
  } catch (err) {
    console.error("Error fetching single listing:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, price, category, imageUrl } = req.body;
    const userId = req.user.id;

    const newListing = await Listing.create({
      userId,
      title,
      description,
      price,
      category,
      imageUrl: imageUrl || null,
    });

    return res.status(201).json(newListing);
  } catch (err) {
    console.error("Error creating listing:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const listingToUpdate = await Listing.findByPk(id);
    if (!listingToUpdate) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listingToUpdate.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this listing" });
    }

    const { title, description, price, category, imageUrl } = req.body;

    listingToUpdate.title = title !== undefined ? title : listingToUpdate.title;
    listingToUpdate.description =
      description !== undefined ? description : listingToUpdate.description;
    listingToUpdate.price = price !== undefined ? price : listingToUpdate.price;
    listingToUpdate.category = category !== undefined ? category : listingToUpdate.category;
    listingToUpdate.imageUrl =
      imageUrl !== undefined ? imageUrl : listingToUpdate.imageUrl;

    await listingToUpdate.save();
    return res.json(listingToUpdate);
  } catch (err) {
    console.error("Error updating listing:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const listingToDelete = await Listing.findByPk(id);
    if (!listingToDelete) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listingToDelete.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this listing" });
    }

    await listingToDelete.destroy();
    return res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting listing:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
