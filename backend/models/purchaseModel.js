const db = require("../config/db");

// ================= GET ALL PURCHASES =================

exports.getAllPurchases = async () => {

    const sql = `
        SELECT
            p.purchase_id,
            p.purchase_date,
            p.total_amount,
            p.payment_status,
            p.amount_paid,
            p.amount_due,
            s.supplier_name
        FROM Purchases p
        JOIN Suppliers s
            ON p.supplier_id = s.supplier_id
        ORDER BY p.purchase_id DESC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

// ================= GET PURCHASE BY ID =================

exports.getPurchaseById = async (id) => {

    const sql = `
        SELECT
            p.*,
            s.supplier_name
        FROM Purchases p
        JOIN Suppliers s
        ON p.supplier_id = s.supplier_id
        WHERE p.purchase_id = ?
    `;

    const [rows] = await db.query(sql,[id]);

    return rows[0];

};


// ================= ADD PURCHASE =================

exports.addPurchase = async (purchase) => {

    console.log("Purchase Data:", purchase);

    const sql = `
        INSERT INTO Purchases
        (
            supplier_id,
            purchase_date,
            total_amount,
            payment_status,
            amount_paid,
            amount_due,
            remarks
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [

        purchase.supplier_id,
        purchase.purchase_date,
        purchase.total_amount,
        purchase.payment_status,
        purchase.amount_paid,
        purchase.amount_due,
        purchase.remarks

    ]);

    console.log("Insert Result:", result);
    console.log("Insert ID:", result.insertId);

    return result.insertId;
};
// ================= DELETE PURCHASE =================

exports.deletePurchase = async (id) => {

    await db.query(
        "DELETE FROM Purchases WHERE purchase_id=?",
        [id]
    );

};
// ================= ADD PURCHASE ITEMS =================

exports.addPurchaseItems = async (purchaseId, items) => {

    for (const item of items) {

        await db.query(

            `
            INSERT INTO PurchaseItems
            (
                purchase_id,
                product_id,
                quantity,
                purchase_price
            )
            VALUES (?, ?, ?, ?)
            `,

            [
                purchaseId,
                item.product_id,
                item.quantity,
                item.purchase_price
            ]

        );

    }

};

// ================= UPDATE PRODUCT STOCK =================

exports.updateStock = async (items) => {

    for (const item of items) {

        await db.query(

            `
            UPDATE Products
            SET stock = stock + ?
            WHERE product_id = ?
            `,

            [
                item.quantity,
                item.product_id
            ]

        );

    }

};

// ================= PURCHASE DETAILS =================

exports.getPurchaseItems = async (purchaseId) => {

    const sql = `

        SELECT

            pi.purchase_item_id,
            pi.quantity,
            pi.purchase_price,

            p.product_name,
            p.image

        FROM PurchaseItems pi

        JOIN Products p
        ON pi.product_id = p.product_id

        WHERE pi.purchase_id = ?

    `;

    const [rows] = await db.query(sql,[purchaseId]);

    return rows;

};