const Address = require("../models/addressModel");

exports.addAddress = (req, res) => {

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

console.log({
    customer_id,
    full_name,
    phone,
    address_line,
    city,
    state,
    pincode,
    address_type
});

    Address.addAddress({

        customer_id,
        full_name,
        phone,
        address_line,
        city,
        state,
        pincode,
        address_type

    }, (err) => {

        if (err) {
            console.error("MySQL Error:", err);
        
            return res.status(500).json({
                message: "Unable to save address",
                error: err.message,
                code: err.code
            });
        }

        res.json({

            message: "Address Saved Successfully"

        });

    });

};

exports.getAddresses = (req, res) => {

    const customer_id = req.customer.id;

    Address.getAddresses(customer_id, (err, result) => {

        if (err) {

            return res.status(500).json({

                message: "Error"

            });

        }

        res.json(result);

    });

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