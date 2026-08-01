const wishlistModel = require("../models/wishlistModel");

exports.addToWishlist = async (req, res) => {

    try {

        const customerId = req.customer.id;
        const { product_id } = req.body;

        await wishlistModel.addToWishlist(customerId, product_id);

        res.json({
            success: true,
            message: "Added to wishlist"
        });

    } catch (err) {

        if (err.code === "ALREADY_EXISTS") {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

exports.getWishlist = async (req, res) => {

    try {
        const rows = await wishlistModel.getWishlist(req.customer.id);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.removeFromWishlist = async (req, res) => {

    try {
        await wishlistModel.removeFromWishlist(
            req.params.id,
            req.customer.id
        );

        res.json({
            message: "Removed Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};