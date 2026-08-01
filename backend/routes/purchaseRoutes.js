const express = require("express");

const router = express.Router();

const purchaseController =
require("../controllers/purchaseController");

// ================= GET ALL PURCHASES =================

router.get(
    "/",
    purchaseController.getAllPurchases
);

// ================= GET PURCHASE DETAILS =================

router.get(
    "/:id",
    purchaseController.getPurchaseById
);

// ================= ADD PURCHASE =================

router.post(
    "/",
    purchaseController.addPurchase
);

// ================= DELETE PURCHASE =================

router.delete(
    "/:id",
    purchaseController.deletePurchase
);

module.exports = router;