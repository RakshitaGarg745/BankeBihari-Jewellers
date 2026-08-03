const Product = require("../models/productModel");

// Get All Products
exports.getProducts = async (req, res) => {

    try {

        const result = await Product.getAllProducts();

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Get Product By ID
exports.getProductById = async (req, res) => {

    try {

        const result = await Product.getProductById(req.params.id);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.json(result[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Add Product
exports.addProduct = async (req, res) => {

    try {

        console.log(req.file);
        const product = req.body;

        product.image = req.file ? req.file.path : null;
        await Product.addProduct(product);

        res.status(201).json({
            success: true,
            message: "Product Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Update Product
exports.updateProduct = async (req, res) => {

    try {

        const product = req.body;

        product.image = req.file
    ? req.file.path
    : req.body.image;

        await Product.updateProduct(req.params.id, product);

        res.json({
            success: true,
            message: "Product Updated Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Delete Product
exports.deleteProduct = async (req, res) => {

    try {

        await Product.deleteProduct(req.params.id);

        res.json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Search Product
exports.searchProducts = async (req, res) => {

    try {

        const result = await Product.searchProducts(req.query.name);

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Low Stock
exports.lowStockProducts = async (req, res) => {

    try {

        const result = await Product.lowStockProducts();

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// Category Products
exports.getProductsByCategory = async (req, res) => {

    try {

        const result = await Product.getProductsByCategory(
            req.params.category
        );

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};