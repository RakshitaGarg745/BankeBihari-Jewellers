const db = require("../config/db");

// Create Booking
exports.createBooking = async (booking) => {

    const sql = `
        INSERT INTO Bookings
        (
            customer_id,
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(
        sql,
        [
            booking.customer_id,
            booking.product_id,
            booking.booking_date,
            booking.booking_expiry,
            booking.advance_amount,
            booking.remaining_amount,
            booking.delivery_type
        ]
    );

    return result;

};
// Customer Booking History
exports.getCustomerBookings = async (customerId) => {

    const sql = `
        SELECT
            b.*,
            p.product_name,
            p.image
        FROM Bookings b
        JOIN Products p
            ON b.product_id = p.product_id
        WHERE b.customer_id = ?
        ORDER BY b.booking_id DESC
    `;

    const [rows] = await db.query(sql, [customerId]);

    return rows;

};

// Owner View All Bookings
exports.getAllBookings = async () => {

    const sql = `
        SELECT
            b.*,
            c.full_name,
            p.product_name
        FROM Bookings b
        JOIN Customers c
            ON b.customer_id = c.customer_id
        JOIN Products p
            ON b.product_id = p.product_id
        ORDER BY b.booking_id DESC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

// Owner - Single Booking

exports.getBookingById = async (id) => {

    const sql = `
        SELECT

            b.*,

            c.full_name,
            c.phone,
            c.email,

            p.product_name,
            p.image,
            p.price,
            p.weight,
            p.metal,
            p.purity

        FROM Bookings b

        JOIN Customers c
        ON b.customer_id = c.customer_id

        JOIN Products p
        ON b.product_id = p.product_id

        WHERE b.booking_id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];

};

// ===========================
// ADMIN ADD BOOKING
// ===========================

exports.adminAddBooking = async (booking) => {

    const sql = `
        INSERT INTO Bookings
        (
            customer_id,
            product_id,
            booking_date,
            booking_expiry,
            advance_amount,
            remaining_amount,
            delivery_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(
        sql,
        [
            booking.customer_id,
            booking.product_id,
            booking.booking_date,
            booking.booking_expiry,
            booking.advance_amount,
            booking.remaining_amount,
            booking.delivery_type
        ]
    );

    return result.insertId;

};
// Update Booking Status
exports.updateStatus = async (status, remark, id) => {

    if(status==="Accepted"){

        const sql=`
        UPDATE Bookings
        SET
            booking_status=?,
            owner_remark=?,
            payment_status='Pending'
        WHERE booking_id=?
        `;

        await db.query(sql,[status,remark,id]);

    }

    else{

        const sql=`
        UPDATE Bookings
        SET
            booking_status=?,
            owner_remark=?
        WHERE booking_id=?
        `;

        await db.query(sql,[status,remark,id]);

    }

};

exports.cancelBooking = async (bookingId, customerId) => {

    const sql = `
        UPDATE Bookings
        SET booking_status='Cancelled'
        WHERE booking_id=?
        AND customer_id=?
        AND booking_status='Pending'
    `;

    const [result] = await db.query(sql, [
        bookingId,
        customerId
    ]);

    return result;

};
// Delete Booking
exports.deleteBooking = async (id) => {

    await db.query(
        "DELETE FROM Bookings WHERE booking_id = ?",
        [id]
    );

};

exports.payAdvance = async (
    bookingId,
    paymentId,
    orderId
) => {

    const sql = `
        UPDATE Bookings
        SET
            payment_status='Paid',
            booking_status='Confirmed',
            razorpay_payment_id=?,
            razorpay_order_id=?,
            payment_date=NOW()
        WHERE booking_id=?
    `;

    await db.query(
        sql,
        [
            paymentId,
            orderId,
            bookingId
        ]
    );

};