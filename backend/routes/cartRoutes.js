const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, cartController.addToCart);

router.get("/", verifyToken, cartController.getCart);

router.put("/increase/:id", verifyToken, cartController.increaseQuantity);

router.put("/decrease/:id", verifyToken, cartController.decreaseQuantity);

router.delete("/:id", verifyToken, cartController.removeItem);

module.exports = router;