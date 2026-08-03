const Address = require("../models/addressModel");

exports.addAddress = async (req, res) => {

    try {

        const customer_id = req.customer.id;

        const {
            full_name,
            phone,
            address_line,
            city,
            state,
            pincode,
            address_type
        } = req.body;

        console.log("Customer:", req.customer);

        await Address.addAddress({
            customer_id,
            full_name,
            phone,
            address_line,
            city,
            state,
            pincode,
            address_type
        });

        res.json({
            success: true,
            message: "Address Saved Successfully"
        });

    } catch (err) {

        console.error("MySQL Error:", err);

        res.status(500).json({
            success: false,
            message: "Unable to save address",
            error: err.message,
            code: err.code
        });

    }

};
exports.getAddresses = async (req, res) => {

    try {

        const customer_id = req.customer.id;

        const rows = await Address.getAddresses(customer_id);

        res.json(rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error"
        });

    }

};
// ================= ADMIN =================

// Get Addresses By Customer

exports.getAddressesByCustomer = (req, res) => {

    const customer_id = req.params.id;

    Address.getAddresses(customer_id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Unable to Fetch Addresses"
            });

        }

        res.json(result);

    });

};