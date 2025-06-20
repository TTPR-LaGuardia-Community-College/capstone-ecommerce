require('dotenv').config();
const express     = require('express');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const cors        = require('cors');
const { sequelize } = require('./db/models');

const authRoutes     = require('./routes/auth');
const usersRoutes    = require('./routes/users');
const listingsRoutes = require('./routes/listings');
// … other routes …

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 100                   // limit per IP
}));

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/listings', listingsRoutes);
// … etc …

// === 404 handler ===
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// === Global error handler ===
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal server error' });
});

// === Start ===
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(console.error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
