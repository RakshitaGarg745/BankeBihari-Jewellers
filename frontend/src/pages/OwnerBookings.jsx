import { useEffect, useState } from "react";
import {
    getAllBookings,
    updateBooking
} from "../services/adminBookingService";

function OwnerBookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const data = await getAllBookings();

            setBookings(data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleStatus = async (
        bookingId,
        status
    ) => {

        const remark = prompt("Enter Owner Remark");

        if (remark === null) return;

        try {

            await updateBooking(
                bookingId,
                status,
                remark
            );

            alert("Booking Updated Successfully");

            loadBookings();

        } catch (err) {

            console.log(err);

            alert("Unable to Update Booking");

        }

    };

    const filteredBookings = bookings.filter((booking) => {

        const searchMatch =
            booking.full_name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            booking.product_name
                .toLowerCase()
                .includes(search.toLowerCase());

        const statusMatch =
            statusFilter === "All" ||
            booking.booking_status === statusFilter;

        return searchMatch && statusMatch;

    });

    return (

        <div className="container mt-5">

            <h2 className="mb-4">

                Booking Management

            </h2>

            <div className="row mb-4">

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Search Customer or Product"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e)=>
                            setStatusFilter(e.target.value)
                        }
                    >

                        <option>All</option>
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                        <option>Completed</option>
                        <option>Cancelled</option>

                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Customer</th>

                        <th>Product</th>

                        <th>Advance</th>

                        <th>Remaining</th>

                        <th>Delivery</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredBookings.map((booking)=>(

                            <tr
                                key={booking.booking_id}
                            >

                                <td>

                                    {booking.full_name}

                                </td>

                                <td>

                                    {booking.product_name}

                                </td>

                                <td>

                                    ₹{booking.advance_amount}

                                </td>

                                <td>

                                    ₹{booking.remaining_amount}

                                </td>

                                <td>

                                    {booking.delivery_type}

                                </td>

                                <td>

                                    {booking.booking_status}

                                </td>

                                <td>

                                    {

                                        booking.booking_status==="Pending" &&

                                        <>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={()=>handleStatus(
                                                    booking.booking_id,
                                                    "Accepted"
                                                )}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={()=>handleStatus(
                                                    booking.booking_id,
                                                    "Rejected"
                                                )}
                                            >
                                                Reject
                                            </button>

                                        </>

                                    }

                                    {

                                        booking.booking_status==="Accepted" &&

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={()=>handleStatus(
                                                booking.booking_id,
                                                "Completed"
                                            )}
                                        >
                                            Complete
                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default OwnerBookings;