require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const authRoutes     = require("./routes/auth");
const usersRoutes    = require("./routes/users");     
const listingsRoutes = require("./routes/listings");
const cartRoutes     = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const messagesRoutes = require("./routes/messages");
const adminRoutes    = require("./routes/admin");

const app = express();


const { sequelize } = require("./db/models");
sequelize.authenticate().then(() => console.log("DB connected"));

// --- GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth",     authRoutes);
app.use("/api/users",    usersRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/cart",     cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/admin",    adminRoutes);

// --- 404 & ERROR HANDLING ---
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
