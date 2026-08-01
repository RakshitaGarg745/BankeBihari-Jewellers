const db = require("../config/db");

// ================= GET ALL SUPPLIERS =================

exports.getAllSuppliers = async () => {

    const [rows] = await db.query(
        "SELECT * FROM Suppliers ORDER BY supplier_name"
    );

    return rows;

};

// ================= ADD SUPPLIER =================

exports.addSupplier = async (supplier) => {

    const sql = `
        INSERT INTO Suppliers
        (
            supplier_name,
            phone,
            email,
            address
        )
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [

        supplier.supplier_name,
        supplier.phone,
        supplier.email,
        supplier.address

    ]);

    return result.insertId;

};

// ================= GET SINGLE SUPPLIER =================

exports.getSupplierById = async (id) => {

    const [rows] = await db.query(

        "SELECT * FROM Suppliers WHERE supplier_id=?",

        [id]

    );

    return rows[0];

};

// ================= UPDATE SUPPLIER =================

exports.updateSupplier = async (id, supplier) => {

    const sql = `
        UPDATE Suppliers
        SET
            supplier_name=?,
            phone=?,
            email=?,
            address=?
        WHERE supplier_id=?
    `;

    await db.query(sql,[

        supplier.supplier_name,
        supplier.phone,
        supplier.email,
        supplier.address,
        id

    ]);

};

// ================= DELETE SUPPLIER =================

exports.deleteSupplier = async(id)=>{

    await db.query(

        "DELETE FROM Suppliers WHERE supplier_id=?",

        [id]

    );

};