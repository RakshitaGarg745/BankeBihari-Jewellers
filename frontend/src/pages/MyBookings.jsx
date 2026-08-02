import { useEffect, useState } from "react";
import {
    getMyBookings,
    cancelBooking,
    payAdvance
} from "../services/bookingService";
import {
    createOrder,
    verifyPayment
    }
    from "../services/paymentService";
function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {

        try {

            const data = await getMyBookings();

            setBookings(data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleBookingPayment = async (booking) => {

        try {
    
            const response = await createOrder(booking.advance_amount);
    
            const order = response.order;
    
            const options = {
    
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    
                amount: order.amount,
    
                currency: order.currency,
    
                name: "Banke Bihari Jewellers",
    
                description: "Booking Advance",
    
                order_id: order.id,
    
                handler: async function (payment) {

                    const verify = await verifyPayment(payment);
                
                    if (verify.success) {
                
                        await payAdvance({
                
                            booking_id: booking.booking_id,
                
                            razorpay_payment_id: payment.razorpay_payment_id,
                
                            razorpay_order_id: payment.razorpay_order_id
                
                        });
                
                        alert("✅ Advance Paid Successfully");
                
                        fetchBookings();
                
                    } else {
                
                        alert("Payment Verification Failed");
                
                    }
                
                },
                config: {
    
                    display: {
    
                        blocks: {
    
                            upi: {
    
                                name: "Pay using UPI",
    
                                instruments: [
                                    {
                                        method: "upi"
                                    }
                                ]
    
                            }
    
                        },
    
                        sequence: [
    
                            "block.upi",
                            "block.card",
                            "block.netbanking",
                            "block.wallet"
    
                        ],
    
                        preferences: {
    
                            show_default_blocks: true
    
                        }
    
                    }
    
                },
    
                theme: {
    
                    color: "#D4AF37"
    
                }
    
            };
    
            const razorpay = new window.Razorpay(options);
    
            razorpay.open();
    
        }
        catch (err) {
    
            console.log(err);
    
            alert("Unable To Start Payment");
    
        }
    
    };
    const getStatusColor = (status) => {

        switch (status) {
    
            case "Pending":
                return "warning";
    
            case "Accepted":
                return "success";
    
            case "Rejected":
                return "danger";
    
            case "Cancelled":
                return "secondary";
    
            case "Completed":
                return "primary";
    
            default:
                return "dark";
        }
    
    };

    const handleCancelBooking = async (bookingId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );
    
        if (!confirmCancel) return;
    
        try {
    
            await cancelBooking(bookingId);
    
            alert("Booking Cancelled Successfully");
    
            fetchBookings();
    
        } catch (err) {
    
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Unable to Cancel Booking");
            }
    
        }
    
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">My Bookings</h2>

            {
                bookings.length === 0 ?

                    <div className="alert alert-info">

                        No Bookings Yet.

                    </div>

                    :

                    bookings.map((booking) => (

                        <div
                            className="card mb-4 shadow"
                            key={booking.booking_id}
                        >

                            <div className="card-body">

                                <h4>{booking.product_name}</h4>

                                <hr />

                                <p>

                                    <strong>Booking Date :</strong>

                                    {" "}

                                    {booking.booking_date?.split("T")[0]}

                                </p>

                                <p>

                                    <strong>Booking Expiry :</strong>

                                    {" "}

                                    {booking.booking_expiry?.split("T")[0]}

                                </p>

                                <p>

                                    <strong>Advance Paid :</strong>

                                    ₹ {booking.advance_amount}

                                </p>

                                <p>

                                    <strong>Remaining Amount :</strong>

                                    ₹ {booking.remaining_amount}

                                </p>

                                <p>

                                    <strong>Delivery :</strong>

                                    {booking.delivery_type}

                                </p>

                                <p>

                                    <strong>Status :</strong>

                                    

                                    <span
                                        className={`badge bg-${getStatusColor(
                                            booking.booking_status
                                        )} ms-2`}
                                    >
                                        {booking.booking_status}
                                    </span>

                                </p>
                                {
    booking.booking_status === "Pending" && (

        <div className="alert alert-warning mt-3">

            <h5>⏳ Waiting for Owner Approval</h5>

            <p className="mb-2">

                Your booking request has been submitted successfully.

            </p>

            <p className="mb-0">

                Once the owner approves your booking, the
                <strong> Pay Advance </strong>
                button will appear here.

            </p>

        </div>

    )
}

{
booking.booking_status === "Accepted" &&
booking.payment_status === "Pending" && (

    <div className="alert alert-success mt-3">

        <h5>🎉 Booking Approved!</h5>

        <p>

            Your booking has been approved by the owner.

        </p>

        <p>

            Please pay the advance amount of
            <strong> ₹ {booking.advance_amount}</strong>
            to confirm your booking.

        </p>

        <button
            className="btn btn-success"
            onClick={() => handleBookingPayment(booking)}
        >
            💳 Pay Advance
        </button>

    </div>

)
}

{
booking.booking_status === "Confirmed" && (

    <div className="alert alert-primary mt-3">

        <h5>✅ Booking Confirmed</h5>

        <p>

            Your advance payment has been received successfully.

        </p>

        <p>

            Please visit the shop before the booking expiry date
            or wait for delivery if you selected Home Delivery.

        </p>

    </div>

)
}

                                {
    booking.booking_status === "Pending" && (

        <button
            className="btn btn-danger mt-3"
            onClick={() => handleCancelBooking(booking.booking_id)}
        >
            Cancel Booking
        </button>

    )
}

                                {

                                    booking.owner_remark &&

                                    <div className="alert alert-secondary">

                                        <strong>Owner Remark :</strong>

                                        <br />

                                        {booking.owner_remark}

                                    </div>

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default MyBookings;