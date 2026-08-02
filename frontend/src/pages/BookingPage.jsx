import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";

function BookingPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.product;

    // Calculate minimum advance safely
    const minimumAdvance = product
        ? Math.ceil(product.price * 0.20)
        : 0;

    // Hooks
    const [advanceAmount, setAdvanceAmount] = useState(minimumAdvance);
    const [deliveryType, setDeliveryType] = useState("Visit Shop");

    if (!product) {
        return (
            <div className="container mt-5">
                <h3>No Product Selected</h3>
            </div>
        );
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (Number(advanceAmount) < minimumAdvance) {
            alert(
                `Minimum advance amount should be ₹${minimumAdvance}`
            );
            return;
        }

        if (Number(advanceAmount) > product.price) {
            alert("Advance amount cannot be greater than product price.");
            return;
        }

        const today = new Date();

const expiry = new Date();
expiry.setDate(today.getDate() + 7);

const formatDate = (date) => {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

};

const bookingDate = formatDate(today);

const bookingExpiry = formatDate(expiry);
try {

    const response = await createBooking({

        product_id: product.product_id,

        booking_date: bookingDate,

        booking_expiry: bookingExpiry,

        advance_amount: Number(advanceAmount),

        remaining_amount:
            product.price - Number(advanceAmount),

        delivery_type: deliveryType

    });

    console.log("Booking Response:", response);

    alert(
        `🎉 Booking Request Submitted Successfully!
        
        Thank you for booking with BankeBihari Jewellers.
        
        ⏳ Your booking request has been sent to the owner for approval.
        
        📌 What happens next?
        
        • The owner will review your booking.
        • Once approved, you can pay the advance amount.
        • After payment, your booking will be confirmed.
        
        You can track everything from "My Bookings".`
        );
        
        navigate("/my-bookings");

}
catch (err) {

    console.log(err);

    alert(err.response?.data?.message || "Booking Failed");

}

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Book Jewellery
                </h2>

                <hr />

                <h4>{product.product_name}</h4>

                <p>
                    <strong>Category :</strong> {product.category}
                </p>

                <p>
                    <strong>Metal :</strong> {product.metal}
                </p>

                <p>
                    <strong>Weight :</strong> {product.weight} g
                </p>

                <p>
                    <strong>Price :</strong> ₹ {product.price}
                </p>

                <div className="alert alert-warning">

                    <strong>
                        Minimum Advance Required (20%)
                    </strong>

                    <br />

                    ₹ {minimumAdvance}

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Advance Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={advanceAmount}
                            min={minimumAdvance}
                            max={product.price}
                            onChange={(e) =>
                                setAdvanceAmount(e.target.value)
                            }
                            required
                        />

                        <small className="text-muted">
                            You can pay more than the minimum advance if you wish.
                        </small>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Delivery Type
                        </label>

                        <select
                            className="form-control"
                            value={deliveryType}
                            onChange={(e) =>
                                setDeliveryType(e.target.value)
                            }
                        >

                            <option value="Visit Shop">
                                Visit Shop
                            </option>

                            <option value="Home Delivery">
                                Home Delivery
                            </option>

                        </select>

                    </div>

                    <div className="alert alert-info">

                        <strong>Booking Policy</strong>

                        <br />

                        • Booking will remain valid for <b>7 days</b>.

                        <br />

                        • Minimum advance required is <b>20%</b> of the product price.

                        <br />

                        • Remaining amount must be paid before the booking expires.

                    </div>

                    <button
                        type="submit"
                        className="btn btn-warning w-100"
                    >
                        Confirm Booking
                    </button>

                </form>

            </div>

        </div>

    );

}

export default BookingPage;