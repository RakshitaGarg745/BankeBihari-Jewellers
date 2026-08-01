console.log("adminModel loaded");
console.log(__filename);

const db = require("../config/db");
const bcrypt = require("bcrypt");

const Admin = {

    async login(email, password) {

        const [rows] = await db.query(
            "SELECT * FROM Admins WHERE email=?",
            [email]
        );

        if (rows.length === 0) {
            return null;
        }

        const admin = rows[0];

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return null;
        }

        return admin;
    }

};

module.exports = Admin;