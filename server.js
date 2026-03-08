const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const port = process.env.PORT || 8080;
const withdrawalRoutes = require("./src/routes/withdrawalRoutes");
const WalletRoutes = require("./src/routes/walletRoutes");
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/wallet", WalletRoutes);
app.use("/api/v1/withdrawal", withdrawalRoutes);

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});