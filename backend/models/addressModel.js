const db = require("../config/db");

const Address = {

    addAddress: async (data) => {

        const sql = `
        INSERT INTO Addresses
        (
            customer_id,
            full_name,
            phone,
            address_line,
            city,
            state,
            pincode,
            address_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [

            data.customer_id,
            data.full_name,
            data.phone,
            data.address_line,
            data.city,
            data.state,
            data.pincode,
            data.address_type

        ]);

        return result.insertId;

    },

    getAddresses: async (customerId) => {

        const [rows] = await db.query(

            `SELECT *
             FROM Addresses
             WHERE customer_id=?
             ORDER BY address_id DESC`,

            [customerId]

        );

        return rows;

    }

};

module.exports = Address;