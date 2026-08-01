const db = require("../config/db");

// ================= SALES REPORT =================

exports.getSalesReport = async () => {

    const sql = `
        SELECT

            COUNT(order_id) AS totalOrders,

            IFNULL(SUM(total_amount),0) AS totalRevenue,

            IFNULL(AVG(total_amount),0) AS averageOrderValue

        FROM Orders

        WHERE order_status='Delivered'
    `;

    const [rows] = await db.query(sql);

    return rows[0];

};

// ================= TOP SELLING PRODUCTS =================

exports.getTopProducts = async () => {

    const sql = `

        SELECT

            p.product_name,

            SUM(oi.quantity) AS totalSold

        FROM OrderItems oi

        JOIN Products p

        ON oi.product_id = p.product_id

        GROUP BY p.product_id

        ORDER BY totalSold DESC

        LIMIT 5

    `;

    const [rows] = await db.query(sql);

    return rows;

};