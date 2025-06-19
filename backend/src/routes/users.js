const express = require("express");
const router  = express.Router();
const { User } = require("../db/models");
const { authenticate, requireAdmin } = require("../middleware/auth");


router.get("/", authenticate, requireAdmin, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});


router.get("/:id", authenticate, async (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== "admin")
    return res.status(403).end();
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
  res.json(user);
});


router.put("/:id", authenticate, async (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== "admin")
    return res.status(403).end();
  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});


router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;
