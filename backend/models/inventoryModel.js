const db = require("../config/db");

// ================= GET INVENTORY =================

exports.getInventory = async () => {

    const sql = `
        SELECT

            p.product_id,
            p.product_name,
            p.category,
            p.metal,
            p.purity,
            p.stock,
            p.price,

            (p.stock * p.price) AS inventory_value,

            (
                SELECT s.supplier_name
                FROM Purchases pu
                JOIN PurchaseItems pi
                    ON pu.purchase_id = pi.purchase_id
                JOIN Suppliers s
                    ON pu.supplier_id = s.supplier_id
                WHERE pi.product_id = p.product_id
                ORDER BY pu.purchase_date DESC
                LIMIT 1
            ) AS supplier_name,

            (
                SELECT pu.purchase_date
                FROM Purchases pu
                JOIN PurchaseItems pi
                    ON pu.purchase_id = pi.purchase_id
                WHERE pi.product_id = p.product_id
                ORDER BY pu.purchase_date DESC
                LIMIT 1
            ) AS last_purchase

        FROM Products p

        ORDER BY p.product_name;
    `;

    const [rows] = await db.query(sql);

    return rows;

};
// ================= LOW STOCK =================

exports.getLowStock = async () => {

    const sql = `
        SELECT *
        FROM Products
        WHERE stock <= 10
        ORDER BY stock
    `;

    const [rows] = await db.query(sql);

    return rows;

};

// ================= OUT OF STOCK =================

exports.getOutOfStock = async () => {

    const sql = `
        SELECT *
        FROM Products
        WHERE stock = 0
    `;

    const [rows] = await db.query(sql);

    return rows;

};

// ================= DASHBOARD STATS =================

exports.getInventoryStats = async () => {

    const [[totalProducts]] = await db.query(
        `
        SELECT COUNT(*) AS totalProducts
        FROM Products
        `
    );

    const [[inventoryValue]] = await db.query(
        `
        SELECT
        IFNULL(SUM(stock * price),0)
        AS inventoryValue
        FROM Products
        `
    );

    const [[lowStock]] = await db.query(
        `
        SELECT COUNT(*) AS lowStock
        FROM Products
        WHERE stock BETWEEN 1 AND 10
        `
    );

    const [[outOfStock]] = await db.query(
        `
        SELECT COUNT(*) AS outOfStock
        FROM Products
        WHERE stock=0
        `
    );

    return {

        totalProducts:
        totalProducts.totalProducts,

        inventoryValue:
        inventoryValue.inventoryValue,

        lowStock:
        lowStock.lowStock,

        outOfStock:
        outOfStock.outOfStock

    };

};