const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { User, Listing, Sequelize } = require("../db/models");
const { Op } = Sequelize;

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

router.delete("/listings/:id", authenticate, requireAdmin, async (req, res) => {
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

router.get("/listings", async function (req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const where = {};

      if (req.query.search) {
        where.title = { [Op.iLike]: `%${req.query.search}%` };
      }
      if (req.query.category) {
        where.category = req.query.category;
      }

      // get paged listings + owner info
      const { count, rows } = await Listing.findAndCountAll({
        where,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [{ model: User, as: "owner", attributes: ["id", "username"] }],
      });

      // fetch distinct categories for the filter dropdown
      const cats = await Listing.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
        ],
      });
      const categories = cats.map((c) => c.get("category"));
      const totalPages = Math.ceil(count / limit);

      return res.json({
        data: rows,
        meta: { totalPages, categories },
      });
    } catch (err) {
      console.error("Error in GET /api/admin/listings:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

const transporter = nodemailer.createTransport({
  host:     process.env.SMTP_HOST,
  port:     Number(process.env.SMTP_PORT),
  secure:   process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- FORGOT PASSWORD ---
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    // only admins:
    const admin = await User.findOne({ where: { email, role: "admin" } });

    if (!admin) {
      return res.json({ message: "If that email is registered, you’ll receive a reset link shortly." });
    }

    // 1) generate a token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    admin.passwordResetToken   = token;
    admin.passwordResetExpires = Date.now() + 3600_000; // 1 hour
    await admin.save();

    // 2) send email
    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${token}`;
    await transporter.sendMail({
      from:    process.env.SMTP_FROM,
      to:      admin.email,
      subject: "Your Admin Password Reset Link",
      html: `
        <p>You (or someone else) requested a password reset for your admin account.</p>
        <p>Click <a href="${resetUrl}">here to reset your password</a>. The link expires in 1 hour.</p>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    });

    return res.json({ message: "If that email is registered, you’ll receive a reset link shortly." });
  } catch (err) {
    console.error("Error in /admin/forgot-password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// --- RESET PASSWORD ---
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const admin = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [Op.gt]: Date.now() },
        role: "admin",
      },
    });
    if (!admin) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hash = await bcrypt.hash(password, 10);
    admin.password               = hash;
    admin.passwordResetToken     = null;
    admin.passwordResetExpires   = null;
    await admin.save();

    return res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Error in /admin/reset-password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
