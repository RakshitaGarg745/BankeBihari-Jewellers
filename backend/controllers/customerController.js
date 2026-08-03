const transporter = require("../config/mail");

const otpStore = {};
const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all customers

exports.getCustomers = async (req, res) => {
    try {
        const result = await Customer.getAllCustomers();
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get customer by ID
exports.getCustomer = async (req, res) => {
    try {
        const result = await Customer.getCustomerById(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add customer
exports.addCustomer = async (req, res) => {
    try {
        await Customer.addCustomer(req.body);

        res.json({
            message: "Customer Added Successfully"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        await Customer.updateCustomer(req.params.id, req.body);

        res.json({
            message: "Customer Updated Successfully"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {

    try {

        const id = req.params.id;

        await Customer.deleteCustomer(id);
        res.json({
            message: "Customer Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Search customer
exports.searchCustomer = async (req, res) => {
    try {
        const result = await Customer.searchCustomer(req.query.keyword);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Register


exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            phone
        } = req.body;

        const user = await Customer.findCustomerByUsername(username);

        if (user.length > 0) {

            return res.status(400).json({
                message: "Username already exists"
            });

        }

        const emailData = await Customer.findByEmail(email);

        if (emailData.length > 0) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const phoneData = await Customer.findByPhone(phone);

        if (phoneData.length > 0) {

            return res.status(400).json({
                message: "Phone Number already exists"
            });

        }

        await Customer.register(req.body);

        res.status(201).json({

            success: true,

            message: "Customer Registered Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Registration Failed"

        });

    }

};

// Login
exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;
        
        const result = await Customer.findByEmail(email);
        
        if (result.length === 0) {
            return res.status(404).json({
                message: "Email not registered"
            });
        }

        const customer = result[0];
        console.log("Result:", result);
console.log("Customer:", customer);
console.log("Password from request:", password, typeof password);
console.log("Password from DB:", customer.password, typeof customer.password);

        const match = await bcrypt.compare(

            password,

            customer.password

        );

        if (!match) {

            return res.status(401).json({

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                id: customer.customer_id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            success: true,

            token,

            customer: {

                customer_id: customer.customer_id,

                full_name: customer.full_name,

                username: customer.username,

                email: customer.email

            }

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

// Profile
exports.profile = async (req, res) => {
    try {

        const result = await Customer.getCustomerById(req.customer.id);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(result[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.sendRegistrationOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const otp = Math.floor(
            100000 + Math.random() * 900000
        );

        otpStore[email] = {

            otp,

            expires: Date.now() + 5 * 60 * 1000

        };

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Jewellery Shop Email Verification",

            html: `
                <h2>Email Verification</h2>
                <h1>${otp}</h1>
                <p>OTP expires in 5 minutes.</p>
            `

        });

        res.json({

            success: true,

            message: "OTP Sent Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable to Send OTP"

        });

    }

};

exports.verifyRegistrationOTP = async (req, res) => {

    const {

        email,

        otp

    } = req.body;

    const data = otpStore[email];

    if (!data) {

        return res.status(400).json({

            message: "OTP Not Found"

        });

    }

    if (Date.now() > data.expires) {

        delete otpStore[email];

        return res.status(400).json({

            message: "OTP Expired"

        });

    }

    if (parseInt(otp) !== data.otp) {

        return res.status(400).json({

            message: "Invalid OTP"

        });

    }

    delete otpStore[email];

    res.json({

        success: true,

        message: "Email Verified"

    });

};

exports.sendForgotPasswordOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const customer = await Customer.findByEmail(email);

        if (customer.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Email not registered"
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        );

        otpStore[email] = {

            otp,

            expires: Date.now() + 5 * 60 * 1000

        };

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Reset Password OTP",

            html: `

            <h2>BankeBihari Jewellers</h2>

            <p>Your OTP for password reset is:</p>

            <h1>${otp}</h1>

            <p>This OTP expires in 5 minutes.</p>

            `

        });

        res.json({

            success: true,

            message: "OTP sent successfully. Please check your Inbox or Spam folder."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable to Send OTP"

        });

    }

};
exports.verifyForgotPasswordOTP = async (req, res) => {

    try {

        const {

            email,

            otp

        } = req.body;

        const data = otpStore[email];

        if (!data) {

            return res.status(400).json({

                message: "OTP Not Found"

            });

        }

        if (Date.now() > data.expires) {

            delete otpStore[email];

            return res.status(400).json({

                message: "OTP Expired"

            });

        }

        if (parseInt(otp) !== data.otp) {

            return res.status(400).json({

                message: "Invalid OTP"

            });

        }

        delete otpStore[email];

        res.json({

            success: true,

            message: "OTP Verified"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};
exports.resetPassword = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        const customer = await Customer.findByEmail(email);

        if (customer.length === 0) {

            return res.status(404).json({

                message: "Email not found"

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Customer.updatePasswordByEmail(

            email,

            hashedPassword

        );

        res.json({

            success: true,

            message: "Password Updated Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};