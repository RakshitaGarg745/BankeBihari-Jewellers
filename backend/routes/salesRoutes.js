const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController");

router.get("/", salesController.getAllSales);
router.get("/customers", salesController.getCustomers);

router.get("/products", salesController.getProducts);

router.post("/", salesController.createSale);

router.get("/:id", salesController.getSaleById);

router.delete("/:id", salesController.deleteSale);

module.exports = router;