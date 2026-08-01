const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/add", verifyToken, addressController.addAddress);

router.get("/", verifyToken, addressController.getAddresses);

// ADMIN
router.get("/admin/:id", addressController.getAddressesByCustomer);

module.exports = router;