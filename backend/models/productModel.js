const db = require("../config/db");

// Get All Products
exports.getAllProducts = async () => {
    const [rows] = await db.query("SELECT * FROM Products");
    return rows;
};

// Get Product By ID
exports.getProductById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM Products WHERE product_id=?",
        [id]
    );
    return rows;
};

// Add Product
exports.addProduct = async (product) => {

    const sql = `
    INSERT INTO Products
    (
        product_name,
        category,
        metal,
        purity,
        weight,
        making_charges,
        price,
        stock,
        description,
        image
    )
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `;

    const [result] = await db.query(sql, [
        product.product_name,
        product.category,
        product.metal,
        product.purity,
        product.weight,
        product.making_charges,
        product.price,
        product.stock,
        product.description,
        product.image
    ]);

    return result;
};

// Update Product
exports.updateProduct = async (id, product) => {

    const sql = `
    UPDATE Products
    SET
        product_name=?,
        category=?,
        metal=?,
        purity=?,
        weight=?,
        making_charges=?,
        price=?,
        stock=?,
        description=?,
        image=?
    WHERE product_id=?
    `;

    const [result] = await db.query(sql, [
        product.product_name,
        product.category,
        product.metal,
        product.purity,
        product.weight,
        product.making_charges,
        product.price,
        product.stock,
        product.description,
        product.image,
        id
    ]);

    return result;
};

// Delete Product
exports.deleteProduct = async (id) => {

    const [result] = await db.query(
        "DELETE FROM Products WHERE product_id=?",
        [id]
    );

    return result;
};

// Search Product
exports.searchProducts = async (name) => {

    const [rows] = await db.query(
        "SELECT * FROM Products WHERE product_name LIKE ?",
        [`%${name}%`]
    );

    return rows;
};

// Low Stock
exports.lowStockProducts = async () => {

    const [rows] = await db.query(
        "SELECT * FROM Products WHERE stock<5"
    );

    return rows;
};

// Category Products
exports.getProductsByCategory = async (category) => {

    const [rows] = await db.query(
        "SELECT * FROM Products WHERE category=? ORDER BY created_at DESC",
        [category]
    );

    return rows;
};