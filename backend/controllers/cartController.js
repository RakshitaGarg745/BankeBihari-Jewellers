const cartModel = require("../models/cartModel");

// Add to Cart
exports.addToCart = async (req, res) => {

    try {

        const customerId = req.customer.id;
        const { product_id } = req.body;

        await cartModel.addToCart(customerId, product_id);

        res.json({
            success: true,
            message: "Product added to cart"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// Get Cart
exports.getCart = async (req, res) => {

    try {

        const customerId = req.customer.id;

        const cart = await cartModel.getCart(customerId);

        res.json(cart);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// Increase Quantity
exports.increaseQuantity = async (req, res) => {

    try {

        await cartModel.increaseQuantity(
            req.params.id,
            req.customer.id
        );

        res.json({
            success: true,
            message: "Quantity Increased"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// Decrease Quantity
exports.decreaseQuantity = async (req, res) => {

    try {

        await cartModel.decreaseQuantity(
            req.params.id,
            req.customer.id
        );

        res.json({
            success: true,
            message: "Quantity Decreased"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// Remove Item
exports.removeItem = async (req, res) => {

    try {

        await cartModel.removeItem(
            req.params.id,
            req.customer.id
        );

        res.json({
            success: true,
            message: "Item Removed"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};