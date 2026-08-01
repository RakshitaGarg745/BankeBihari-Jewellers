const db = require("../config/db");

// Add to Cart
exports.addToCart = async (customerId, productId) => {

    // Check if product already exists in cart
    const [rows] = await db.query(
        `SELECT * FROM Cart
         WHERE customer_id=? AND product_id=?`,
        [customerId, productId]
    );

    if (rows.length > 0) {

        // Increase quantity
        await db.query(
            `UPDATE Cart
             SET quantity = quantity + 1
             WHERE customer_id=? AND product_id=?`,
            [customerId, productId]
        );

    } else {

        // Insert new product
        await db.query(
            `INSERT INTO Cart(customer_id, product_id, quantity)
             VALUES (?, ?, 1)`,
            [customerId, productId]
        );

    }

};

// Get Cart
exports.getCart = async (customerId) => {

    const [rows] = await db.query(
        `SELECT
            c.cart_id,
            c.quantity,
            p.product_id,
            p.product_name,
            p.price,
            p.image
        FROM Cart c
        JOIN Products p
        ON c.product_id = p.product_id
        WHERE c.customer_id=?`,
        [customerId]
    );

    return rows;
};

// Increase Quantity
exports.increaseQuantity = async (cartId, customerId) => {

    await db.query(
        `UPDATE Cart
         SET quantity = quantity + 1
         WHERE cart_id=? AND customer_id=?`,
        [cartId, customerId]
    );

};

// Decrease Quantity
exports.decreaseQuantity = async (cartId, customerId) => {

    const [rows] = await db.query(
        `SELECT quantity
         FROM Cart
         WHERE cart_id=? AND customer_id=?`,
        [cartId, customerId]
    );

    if (rows.length === 0) return;

    if (rows[0].quantity > 1) {

        await db.query(
            `UPDATE Cart
             SET quantity = quantity - 1
             WHERE cart_id=? AND customer_id=?`,
            [cartId, customerId]
        );

    } else {

        await db.query(
            `DELETE FROM Cart
             WHERE cart_id=? AND customer_id=?`,
            [cartId, customerId]
        );

    }

};

// Remove Item
exports.removeItem = async (cartId, customerId) => {

    await db.query(
        `DELETE FROM Cart
         WHERE cart_id=? AND customer_id=?`,
        [cartId, customerId]
    );

};