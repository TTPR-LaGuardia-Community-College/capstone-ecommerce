const express = require("express");
const { Cart, Listing } = require("../db/models");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.use(authenticate);

router.get("/", async (req, res) => {
  const items = await Cart.findAll({
    where: { userId: req.user.id },
    include: [{ model: Listing, as: "listing" }]
  });
  res.json(items);
});

router.post("/", async (req, res) => {
  const { productId } = req.body;
  await Cart.create({ userId: req.user.id, productId });
  const items = await Cart.findAll({ where: { userId: req.user.id }, include: [{ model: Listing, as: "listing" }] });
  res.json(items);
});

router.delete("/:productId", async (req, res) => {
  await Cart.destroy({ where: { userId: req.user.id, productId: req.params.productId } });
  const items = await Cart.findAll({ where: { userId: req.user.id }, include: [{ model: Listing, as: "listing" }] });
  res.json(items);
});

module.exports = router;