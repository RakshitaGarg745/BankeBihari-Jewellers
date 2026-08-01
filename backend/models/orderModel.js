const db = require("../config/db");

const Order = {

    // ===========================
    // Get Customer Cart Items
    // ===========================
    getCartItems: (customerId, callback) => {

        const sql = `
        SELECT
            Cart.cart_id,
            Cart.product_id,
            Cart.quantity,
            Products.product_name,
            Products.price,
            Products.stock,
            Products.image
        FROM Cart
        JOIN Products
        ON Cart.product_id = Products.product_id
        WHERE Cart.customer_id = ?
        `;

        db.query(sql, [customerId])
            .then(([rows]) => callback(null, rows))
            .catch(err => callback(err));
    },

    // ===========================
    // Create Order
    // ===========================
    createOrder: (
        customerId,
        addressId,
        totalAmount,
        paymentMethod,
        paymentStatus,
        callback
    ) => {

        const sql = `
        INSERT INTO Orders
(
    customer_id,
    address_id,
    total_amount,
    payment_method,
    payment_status
)
VALUES (?,?,?,?,?)
        `;

        db.query(sql, [

            customerId,
            addressId,
            totalAmount,
            paymentMethod,
            paymentStatus
        
        ])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },

    // ===========================
    // Add Order Item
    // ===========================
    addOrderItem: (
        orderId,
        productId,
        quantity,
        price,
        callback
    ) => {

        const sql = `
        INSERT INTO OrderItems
        (
            order_id,
            product_id,
            quantity,
            price
        )
        VALUES (?,?,?,?)
        `;

        db.query(sql, [
            orderId,
            productId,
            quantity,
            price
        ])
            .then(() => callback(null))
            .catch(err => callback(err));

    },

    // ===========================
    // Reduce Stock
    // ===========================
    reduceStock: (
        productId,
        quantity,
        callback
    ) => {

        const sql = `
        UPDATE Products
        SET stock = stock - ?
        WHERE product_id = ?
        `;

        db.query(sql, [quantity, productId])
            .then(() => callback(null))
            .catch(err => callback(err));

    },

    // ===========================
    // Clear Cart
    // ===========================
    clearCart: (
        customerId,
        callback
    ) => {

        db.query(
            "DELETE FROM Cart WHERE customer_id=?",
            [customerId]
        )
            .then(() => callback(null))
            .catch(err => callback(err));

    },

    // ===========================
    // My Orders
    // ===========================
    getMyOrders: (
        customerId,
        callback
    ) => {

        const sql = `
        SELECT *
        FROM Orders
        WHERE customer_id=?
        ORDER BY order_date DESC
        `;

        db.query(sql, [customerId])
            .then(([rows]) => callback(null, rows))
            .catch(err => callback(err));

    },

    // ===========================
    // Order Details
    // ===========================
    getOrderDetails: (
        orderId,
        callback
    ) => {

        const sql = `
SELECT
    o.order_id,
    c.full_name,
    o.order_date,
    o.total_amount,
    o.payment_method,
    o.payment_status,
    o.order_status
FROM Orders o
JOIN Customers c
ON o.customer_id = c.customer_id
ORDER BY o.order_id DESC

JOIN OrderItems oi
ON o.order_id = oi.order_id

JOIN Products p
ON oi.product_id = p.product_id

WHERE o.order_id = ?
`;
        db.query(sql, [orderId])
            .then(([rows]) => callback(null, rows))
            .catch(err => callback(err));

    },

    // ===========================
    // Admin - All Orders
    // ===========================
    getAllOrders: async () => {

        const sql = `
SELECT
    o.order_id,
    c.full_name,
    o.order_date,
    o.total_amount,
    o.payment_method,
    o.payment_status,
    o.order_status
FROM Orders o
JOIN Customers c
ON o.customer_id = c.customer_id
ORDER BY o.order_id DESC
`;

        const [rows] = await db.query(sql);
        console.log(rows);
        return rows;

    },

    // ===========================
    // Admin - Single Order
    // ===========================
    // ===========================
// Admin - Single Order
// ===========================
getSingleOrder: async (id) => {

    // Order Details
    const orderSql = `
    SELECT

        o.order_id,
        o.total_amount,
        o.payment_method,
        o.order_status,
        o.order_date,

        c.full_name,
        c.phone,
        c.email,

        a.address_line,
        a.city,
        a.state,
        a.pincode

    FROM Orders o

    JOIN Customers c
    ON o.customer_id = c.customer_id

    JOIN Addresses a
    ON o.address_id = a.address_id

    WHERE o.order_id = ?
    `;

    // Products inside order
    const itemsSql = `
    SELECT

        p.product_name,
        p.image,

        oi.quantity,
        oi.price

    FROM OrderItems oi

    JOIN Products p

    ON oi.product_id = p.product_id

    WHERE oi.order_id = ?
    `;

    const [order] = await db.query(orderSql,[id]);

    const [items] = await db.query(itemsSql,[id]);

    return {

        ...order[0],

        items

    };

},

// ===========================
// ADMIN ADD ORDER
// ===========================

adminAddOrder: async (
    customerId,
    addressId,
    paymentMethod,
    items
) => {

    let total = 0;

    // Calculate Total
    for (let item of items) {

        const [product] = await db.query(
            "SELECT price,stock FROM Products WHERE product_id=?",
            [item.product_id]
        );

        if (product.length == 0)
            throw new Error("Product Not Found");

        if (product[0].stock < item.quantity)
            throw new Error("Insufficient Stock");

        item.price = product[0].price;

        total += product[0].price * item.quantity;

    }

    // Create Order

    const [order] = await db.query(
        `
        INSERT INTO Orders
(
    customer_id,
    address_id,
    total_amount,
    payment_method,
    payment_status
)
VALUES (?,?,?,?,?)
        `,
        [
            customerId,
            addressId,
            total,
            paymentMethod
        ]
    );

    const orderId = order.insertId;

    // Insert Items + Reduce Stock

    for (let item of items) {

        await db.query(
            `
            INSERT INTO OrderItems
            (
                order_id,
                product_id,
                quantity,
                price
            )
            VALUES (?,?,?,?)
            `,
            [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]
        );

        await db.query(
            `
            UPDATE Products
            SET stock = stock - ?
            WHERE product_id=?
            `,
            [
                item.quantity,
                item.product_id
            ]
        );

    }

    return orderId;

},

    // ===========================
    // Update Status
    // ===========================
    updateStatus: async (id, status) => {

        await db.query(
            `
            UPDATE Orders
            SET order_status=?
            WHERE order_id=?
            `,
            [status, id]
        );

    },

    // ===========================
    // Delete Order
    // ===========================
    deleteOrder: async (id) => {

        await db.query(
            "DELETE FROM OrderItems WHERE order_id=?",
            [id]
        );

        await db.query(
            "DELETE FROM Orders WHERE order_id=?",
            [id]
        );

    }

};

module.exports = Order;