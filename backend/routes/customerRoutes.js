const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customerController");

const { verifyToken } = require("../middleware/authMiddleware");

// Existing CRUD Routes

router.post("/register", customerController.register);
router.post("/login", customerController.login);
router.post(

    "/reset-password",

    customerController.resetPassword

);
router.get("/profile", verifyToken, customerController.profile);

router.get("/", customerController.getCustomers);
router.post("/", customerController.addCustomer);
router.get("/:id", customerController.getCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);
// Registration OTP
router.post(
    "/send-registration-otp",
    customerController.sendRegistrationOTP
);

router.post(
    "/verify-registration-otp",
    customerController.verifyRegistrationOTP
);

// Forgot Password
router.post(
    "/forgot-password/send-otp",
    customerController.sendForgotPasswordOTP
);

router.post(
    "/forgot-password/verify-otp",
    customerController.verifyForgotPasswordOTP
);



module.exports = router;