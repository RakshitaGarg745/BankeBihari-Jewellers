const db = require("../config/db");

// ================= GET ALL SALES =================

exports.getAllSales = async () => {

    const [rows] = await db.query(`
        SELECT
            s.sale_id,
            c.full_name,
            s.sale_date,
            s.total_amount,
            s.amount_paid,
            s.amount_left,
            s.sale_type
        FROM Sales s
        JOIN Customers c
        ON s.customer_id = c.customer_id
        ORDER BY s.sale_id DESC
    `);

    return rows;
};

// ================= CREATE SALE =================

exports.createSale = async (sale) => {

    const [result] = await db.query(

        `INSERT INTO Sales
        (
            customer_id,
            sale_date,
            total_amount,
            amount_paid,
            amount_left,
            sale_type
        )
        VALUES (?,?,?,?,?,?)`,

        [
            sale.customer_id,
            sale.sale_date,
            sale.total_amount,
            sale.amount_paid,
            sale.amount_left,
            sale.sale_type
        ]

    );

    return result.insertId;

};

// ================= ADD SALE ITEMS =================

exports.addSaleItems = async (saleId, items) => {

    for (const item of items) {

        await db.query(

            `INSERT INTO SaleItems
            (
                sale_id,
                product_id,
                quantity,
                price
            )
            VALUES (?,?,?,?)`,

            [
                saleId,
                item.product_id,
                item.quantity,
                item.price
            ]

        );

    }

};

// ================= REDUCE STOCK =================

exports.reduceStock = async (items) => {

    for (const item of items) {

        await db.query(

            `UPDATE Products
             SET stock = stock - ?
             WHERE product_id = ?`,

            [
                item.quantity,
                item.product_id
            ]

        );

    }

};

// ================= SALE DETAILS =================

exports.getSaleById = async (id) => {

    const [rows] = await db.query(

        `SELECT
            s.*,
            c.full_name
         FROM Sales s
         JOIN Customers c
         ON s.customer_id=c.customer_id
         WHERE sale_id=?`,

        [id]

    );

    return rows[0];

};

// ================= SALE ITEMS =================

exports.getSaleItems = async (saleId) => {

    const [rows] = await db.query(

        `SELECT
            si.*,
            p.product_name
         FROM SaleItems si
         JOIN Products p
         ON si.product_id=p.product_id
         WHERE sale_id=?`,

        [saleId]

    );

    return rows;

};

// ================= DELETE =================

exports.deleteSale = async (saleId) => {

    const [items] = await db.query(
        `SELECT product_id, quantity
         FROM SaleItems
         WHERE sale_id=?`,
        [saleId]
    );

    for (const item of items) {

        await db.query(
            `UPDATE Products
             SET stock = stock + ?
             WHERE product_id=?`,
            [item.quantity, item.product_id]
        );

    }

    await db.query(
        "DELETE FROM SaleItems WHERE sale_id=?",
        [saleId]
    );

    await db.query(
        "DELETE FROM Sales WHERE sale_id=?",
        [saleId]
    );

};