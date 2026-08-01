const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// ================= ALL INVENTORY =================
router.get(
    "/stats",
    inventoryController.getInventoryStats
);
router.get(
    "/",
    inventoryController.getInventory
);

// ================= LOW STOCK =================

router.get(
    "/low-stock",
    inventoryController.getLowStock
);

// ================= OUT OF STOCK =================

router.get(
    "/out-of-stock",
    inventoryController.getOutOfStock
);


module.exports = router;