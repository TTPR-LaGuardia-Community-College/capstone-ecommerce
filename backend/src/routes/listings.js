var express = require("express");
const db = require("../db");

var router = express.Router();

const User = db["User"];

router.get("/", function (req, res, next) {
  User.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
