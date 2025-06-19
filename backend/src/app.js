require("dotenv").config();
const express = require("express");
const cors = require("cors")

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const listingsRoutes = require("./routes/listings.js");
const wishlistRoutes = require("./routes/wishlist.js");
const messagesRoutes = require("./routes/messages.js");
const adminRoutes = require("./routes/admin.js");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
// global error-handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
