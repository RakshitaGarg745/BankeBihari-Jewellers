const db = require("../config/db");

// Add to wishlist
exports.addToWishlist = async (customerId, productId) => {

    const [rows] = await db.query(
        `SELECT * FROM Wishlist
         WHERE customer_id=? AND product_id=?`,
        [customerId, productId]
    );

    if (rows.length > 0) {
        const err = new Error("Already exists");
        err.code = "ALREADY_EXISTS";
        throw err;
    }

    await db.query(
        `INSERT INTO Wishlist(customer_id, product_id)
         VALUES (?, ?)`,
        [customerId, productId]
    );
};

// Get wishlist
exports.getWishlist = async (customerId) => {

    const [rows] = await db.query(
        `SELECT w.wishlist_id, p.*
         FROM Wishlist w
         JOIN Products p
         ON w.product_id = p.product_id
         WHERE w.customer_id=?
         ORDER BY w.created_at DESC`,
        [customerId]
    );

    return rows;
};

// Remove
exports.removeFromWishlist = async (wishlistId, customerId) => {

    await db.query(
        `DELETE FROM Wishlist
         WHERE wishlist_id=? AND customer_id=?`,
        [wishlistId, customerId]
    );
};