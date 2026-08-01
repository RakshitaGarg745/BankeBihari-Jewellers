const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

// ================= CUSTOMER =================

router.post(
    "/create",
    verifyToken,
    bookingController.createBooking
);

router.get(
    "/my-bookings",
    verifyToken,
    bookingController.getMyBookings
);

router.put(
    "/cancel/:id",
    verifyToken,
    bookingController.cancelBooking
);

// ================= OWNER =================

// All Bookings
router.get(
    "/all",
    bookingController.getAllBookings
);

// Single Booking  ⭐ NEW
router.get(
    "/admin/:id",
    bookingController.getBookingById
);

// Update Status
router.put(
    "/update/:id",
    bookingController.updateStatus
);

router.delete(
    "/delete/:id",
    bookingController.deleteBooking
);

router.post(
    "/admin/add",
    bookingController.adminAddBooking
);
router.post(
    "/pay-advance",
    verifyToken,
    bookingController.payAdvance
);

module.exports = router;