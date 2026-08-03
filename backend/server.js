
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ],
    credentials: true
  }));
require("dotenv").config();



const db = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierRoutes =
require("./routes/supplierRoutes");
console.log("Admin routes imported");
const purchaseRoutes = require("./routes/purchaseRoutes");
const inventoryRoutes =
require("./routes/inventoryRoutes");
const reportRoutes =
require("./routes/reportRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const salesRoutes = require("./routes/salesRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const dashboardChartRoutes =
require("./routes/dashboardChartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
console.log("Payment Routes:", paymentRoutes);
console.log("Type:", typeof paymentRoutes);
// Middleware


app.use(express.json());



// API Routes
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/address", addressRoutes);
app.use("/orders", orderRoutes);
app.use("/booking", bookingRoutes);
app.use("/admin", adminRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/reports", reportRoutes);
app.use(
    "/dashboard",
    dashboardRoutes
    );
    app.use("/sales", salesRoutes);
    app.use("/invoice", invoiceRoutes);
    app.use(
        "/dashboard-chart",
        dashboardChartRoutes
        );
        app.use("/payment", paymentRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("🏆 Welcome to BankeBihari Jewellers API");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});