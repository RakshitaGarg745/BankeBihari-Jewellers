const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,          // Added
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }                                   // Added for Aiven
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    } catch (err) {
        console.log("❌ Database Connection Failed");
        console.log(err);
    }
})();

module.exports = db;