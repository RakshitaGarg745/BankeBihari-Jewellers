const express = require("express");

const router = express.Router();

const supplierController =
require("../controllers/supplierController");

// Get All
router.get(
    "/",
    supplierController.getAllSuppliers
);

// Add
router.post(
    "/",
    supplierController.addSupplier
);

// Get One
router.get(
    "/:id",
    supplierController.getSupplierById
);

// Update
router.put(
    "/:id",
    supplierController.updateSupplier
);

// Delete
router.delete(
    "/:id",
    supplierController.deleteSupplier
);

module.exports = router;