const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

// ================= CUSTOMER =================

// Place Order
router.post("/place", verifyToken, orderController.placeOrder);

// My Orders
router.get("/myorders", verifyToken, orderController.getMyOrders);

// Order Details
router.get("/details/:id", verifyToken, orderController.getOrderDetails);


// ================= ADMIN =================

// Get All Orders
router.get("/admin", orderController.getAllOrders);

// Get Single Order
router.get("/admin/:id", orderController.getSingleOrder);

// Update Order Status
// Admin Add Order
router.post("/admin/add", orderController.adminAddOrder);
router.put("/admin/status/:id", orderController.updateStatus);

// Delete Order
router.delete("/admin/:id", orderController.deleteOrder);
router.put(
    "/admin/payment/:id",
    orderController.updatePaymentStatus
);

module.exports = router;