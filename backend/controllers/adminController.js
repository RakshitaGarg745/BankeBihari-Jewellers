const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

console.log("================================");
console.log("Admin =", Admin);
console.log("Keys =", Object.keys(Admin));
console.log("login =", Admin.login);
console.log("================================");
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const admin = await Admin.login(email, password);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                admin_id: admin.admin_id,
                email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                admin_id: admin.admin_id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.log("========== ERROR ==========");
        console.error(error);
        console.log("===========================");
    
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    login
};