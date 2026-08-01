const db = require("../config/db");

// ================= MONTHLY SALES =================

exports.getMonthlySales = async () => {

    const [rows] = await db.query(

        `SELECT

            MONTH(sale_date) AS month_no,

            MONTHNAME(sale_date) AS month,

            SUM(total_amount) AS total

        FROM Sales

        GROUP BY

            MONTH(sale_date),

            MONTHNAME(sale_date)

        ORDER BY month_no`

    );

    return rows;

};

// ================= MONTHLY PURCHASES =================

exports.getMonthlyPurchases = async () => {

    const [rows] = await db.query(

        `SELECT

            MONTH(purchase_date) AS month_no,

            MONTHNAME(purchase_date) AS month,

            SUM(total_amount) AS total

        FROM Purchases

        GROUP BY

            MONTH(purchase_date),

            MONTHNAME(purchase_date)

        ORDER BY month_no`

    );

    return rows;

};

// ================= ORDER STATUS =================

exports.getOrderStatus = async () => {

    const [rows] = await db.query(

        `SELECT

            order_status,

            COUNT(*) AS total

        FROM Orders

        GROUP BY order_status`

    );

    return rows;

};

// ================= LOW STOCK =================

exports.getLowStock = async () => {

    const [rows] = await db.query(

        `SELECT

            product_name,

            stock

        FROM Products

        WHERE stock<=10

        ORDER BY stock ASC

        LIMIT 5`

    );

    return rows;

};