const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/search", productController.searchProducts);
router.get("/low-stock", productController.lowStockProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", productController.getProductById);


router.post(
    "/",
    upload.single("image"),
    productController.addProduct
);

router.put(
    "/:id",
    upload.single("image"),
    productController.updateProduct
);


router.delete("/:id", productController.deleteProduct);

module.exports = router;