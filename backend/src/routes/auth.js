const express           = require('express');
const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User }          = require('../db/models');
require('dotenv').config();

const router     = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// --- REGISTER ---
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, email, password } = req.body;
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hash, role: 'user' });
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      });
    } catch (err) {
      next(err);
    }
  }
);

// --- LOGIN ---
router.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

// --- GET CURRENT USER ---
router.get('/me', async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).end();
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    const user = await User.findByPk(payload.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
