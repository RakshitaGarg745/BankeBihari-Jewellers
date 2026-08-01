const bookingModel = require("../models/bookingModel");

// Customer Create Booking
exports.createBooking = async (req, res) => {

    try {

        const customer_id = req.customer.id;

        const {
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type
        } = req.body;

        await bookingModel.createBooking({

            customer_id,
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type

        });

        return res.status(200).json({

            success: true,

            message: "Booking Created Successfully"

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Booking Failed"

        });

    }

};
// ===========================
// ADMIN ADD BOOKING
// ===========================

exports.adminAddBooking = async (req, res) => {

    try {

        const {
            customer_id,
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type
        } = req.body;

        const bookingId = await bookingModel.adminAddBooking({

            customer_id,
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type

        });

        res.json({
            success: true,
            message: "Booking Added Successfully",
            bookingId
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Customer Booking History
exports.getMyBookings = async (req, res) => {
    console.log(req.customer);

    try {

        const result = await bookingModel.getCustomerBookings(
            req.customer.id
        );

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable To Fetch Bookings"
        });

    }

};

// Owner View All Bookings
exports.getAllBookings = async (req, res) => {

    try {

        const result = await bookingModel.getAllBookings();

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};
// Owner - Single Booking

// ================= OWNER - SINGLE BOOKING =================

exports.getBookingById = async (req, res) => {

    try {

        const booking = await bookingModel.getBookingById(req.params.id);

        res.json(booking);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable To Fetch Booking"
        });

    }

};


// Update Status
exports.updateStatus = async (req, res) => {

    try {

        const id = req.params.id;

        const {
            booking_status,
            owner_remark
        } = req.body;

        await bookingModel.updateStatus(
            booking_status,
            owner_remark,
            id
        );

        res.json({
            success: true,
            message: "Booking Updated Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable To Update Booking"
        });

    }

};

exports.cancelBooking = async (req, res) => {

    try {

        const bookingId = req.params.id;

        const customerId = req.customer.id;

        const result = await bookingModel.cancelBooking(

            bookingId,

            customerId

        );

        if (result.affectedRows === 0) {

            return res.status(400).json({

                message: "Booking cannot be cancelled."

            });

        }

        res.json({

            success: true,

            message: "Booking Cancelled Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable To Cancel Booking"

        });

    }

};
// Delete Booking
exports.deleteBooking = async (req, res) => {

    try {

        await bookingModel.deleteBooking(req.params.id);

        res.json({
            success: true,
            message: "Booking Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable To Delete Booking"
        });

    }

};

exports.payAdvance = async (req, res) => {

    try {

        const {
            booking_id,
            razorpay_payment_id,
            razorpay_order_id
        } = req.body;

        await bookingModel.payAdvance(
            booking_id,
            razorpay_payment_id,
            razorpay_order_id
        );

        res.json({
            success: true,
            message: "Advance Payment Saved Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable To Save Payment"
        });

    }

};