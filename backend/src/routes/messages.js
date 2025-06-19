const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Message, User } = require("../db/models");

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


router.get("/inbox", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const inbox = await Message.findAll({
      where: { receiverId: userId },
      include: [
        { model: User, as: "sender", attributes: ["id", "username", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(inbox);
  } catch (err) {
    console.error("Error fetching inbox:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/sent", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const sent = await Message.findAll({
      where: { senderId: userId },
      include: [
        { model: User, as: "receiver", attributes: ["id", "username", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(sent);
  } catch (err) {
    console.error("Error fetching sent messages:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }


    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
    });

    return res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
