const db = require("../config/db");

// Get all customers
exports.getAllCustomers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM Customers ORDER BY customer_id DESC"
    );
    return rows;
};

// Get customer by ID
exports.getCustomerById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM Customers WHERE customer_id=?",
        [id]
    );
    return rows;
};

// Add customer
exports.addCustomer = async (customer) => {

    const sql = `
    INSERT INTO Customers
    (full_name, phone, email, password, address, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        customer.full_name,
        customer.phone,
        customer.email,
        customer.password,
        customer.address,
        customer.city,
        customer.state,
        customer.pincode
    ]);

    return result;
};

// Update customer
exports.updateCustomer = async (id, customer) => {

    const sql = `
    UPDATE Customers
    SET
        full_name=?,
        phone=?,
        email=?,
        password=?,
        address=?,
        city=?,
        state=?,
        pincode=?
    WHERE customer_id=?
    `;

    const [result] = await db.query(sql, [
        customer.full_name,
        customer.phone,
        customer.email,
        customer.password,
        customer.address,
        customer.city,
        customer.state,
        customer.pincode,
        id
    ]);

    return result;
};

// Delete customer
exports.deleteCustomer = async (id) => {

    const sql =
        "DELETE FROM customers WHERE customer_id = ?";

    await db.query(sql, [id]);

};

// Search customer
exports.searchCustomer = async (keyword) => {

    const sql = `
    SELECT * FROM Customers
    WHERE
    full_name LIKE ?
    OR phone LIKE ?
    OR email LIKE ?
    `;

    const [rows] = await db.query(sql, [
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`
    ]);

    return rows;
};

// Find customer by email
exports.findCustomerByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM Customers WHERE email=?",
        [email]
    );

    return rows;
};
// Find Customer By Username

exports.findCustomerByUsername = async (username) => {

    const [rows] = await db.query(

        "SELECT * FROM Customers WHERE username=?",

        [username]

    );

    return rows;

};
// Register customer
// Register customer

const bcrypt = require("bcrypt");

exports.findByEmail = async (email) => {

    const [rows] = await db.query(

        "SELECT * FROM Customers WHERE email=?",

        [email]

    );

    return rows;

};

exports.findByPhone = async (phone) => {

    const [rows] = await db.query(

        "SELECT * FROM Customers WHERE phone=?",

        [phone]

    );

    return rows;

};
exports.register = async (customer) => {

    const {
        full_name,
        username,
        email,
        phone,
        address,
        password
    } = customer;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO Customers
        (full_name, username, email, phone, address, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    return db.query(sql, [
        full_name,
        username,
        email,
        phone,
        address,
        hashedPassword
    ]);
};

exports.updatePassword = async (username, password) => {

    const sql = `
        UPDATE Customers
        SET password = ?
        WHERE username = ?
    `;

    const [result] = await db.query(sql, [
        password,
        username
    ]);

    return result;
};

exports.updatePasswordByEmail = async (email, password) => {

    const sql = `
        UPDATE Customers
        SET password = ?
        WHERE email = ?
    `;

    const [result] = await db.query(sql, [
        password,
        email
    ]);

    return result;
};