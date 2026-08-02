import { useEffect, useState } from "react";
import axios from "axios";
import {
    getMyBookings,
    cancelBooking,
    payAdvance
} from "../services/bookingService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                `${process.env.REACT_APP_API_URL}/booking/my`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setBookings(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const cancelBooking = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${process.env.REACT_APP_API_URL}/booking/cancel/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Booking Cancelled");

            fetchBookings();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                My Bookings

            </h2>

            {

                bookings.length === 0 ?

                (

                    <div className="alert alert-info">

                        No Bookings Found

                    </div>

                )

                :

                (

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Product</th>
                                <th>Booking Date</th>
                                <th>Expiry Date</th>
                                <th>Advance</th>
                                <th>Remaining</th>
                                <th>Status</th>
                                <th>Remark</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                bookings.map((booking) => (

                                    <tr key={booking.booking_id}>

                                        <td>{booking.booking_id}</td>

                                        <td>{booking.product_name}</td>

                                        <td>{booking.booking_date?.substring(0,10)}</td>

                                        <td>{booking.booking_expiry?.substring(0,10)}</td>

                                        <td>₹ {booking.advance_amount}</td>

                                        <td>₹ {booking.remaining_amount}</td>

                                        <td>

                                            <span
                                                className={
                                                    booking.booking_status === "Pending"
                                                        ? "badge bg-warning text-dark"
                                                        : booking.booking_status === "Accepted"
                                                        ? "badge bg-primary"
                                                        : booking.booking_status === "Completed"
                                                        ? "badge bg-success"
                                                        : booking.booking_status === "Rejected"
                                                        ? "badge bg-danger"
                                                        : "badge bg-secondary"
                                                }
                                            >

                                                {booking.booking_status}

                                            </span>

                                        </td>

                                        <td>

                                            {booking.owner_remark || "-"}

                                        </td>

                                        <td>

                                            {

                                                booking.booking_status === "Pending" && (

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            cancelBooking(
                                                                booking.booking_id
                                                            )
                                                        }
                                                    >

                                                        Cancel

                                                    </button>

                                                )

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

export default MyBookings;