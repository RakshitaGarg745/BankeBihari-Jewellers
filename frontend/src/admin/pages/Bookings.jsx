import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Bookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        fetchBookings();

    }, []);

    // =============================
    // Fetch Bookings
    // =============================

    const fetchBookings = async () => {

        try {

            const res = await axios.get(
               `${process.env.REACT_APP_API_URL}/booking/all`
            );

            setBookings(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // =============================
    // View Booking
    // =============================

    const viewBooking = async (id) => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/booking/admin/${id}`
            );

            setSelectedBooking(res.data);

            setShowModal(true);

        } catch (err) {

            console.log(err);

            alert("Unable To Fetch Booking");

        }

    };

    // =============================
    // Update Status
    // =============================

    const updateStatus = async (id, status) => {

        try {

            await axios.put(

                `${process.env.REACT_APP_API_URL}`/booking/update/${id}`,

                {

                    booking_status: status,

                    owner_remark: status

                }

            );

            fetchBookings();

        } catch (err) {

            console.log(err);

        }

    };

    const deleteBooking = async (id) => {

        if (!window.confirm("Delete this booking?")) return;
    
        try {
    
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/booking/delete/${id}`
            );
    
            fetchBookings();
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable To Delete Booking");
    
        }
    
    };

    // =============================
    // Search
    // =============================

    const filteredBookings = bookings.filter((booking) =>

        booking.full_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="container mt-4">

<div className="d-flex justify-content-between mb-4">

<h2>

    Booking Management

</h2>

<button
    className="btn btn-primary"
    onClick={() => navigate("/admin/add-booking")}
>

    + Add Booking

</button>

</div>

            <input

                className="form-control mb-4"

                placeholder="Search Customer..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Customer</th>

                        <th>Product</th>

                        <th>Advance</th>

                        <th>Remaining</th>

                        <th>Status</th>
<th>Payment</th>
<th width="350">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredBookings.map((booking)=>(

                            <tr key={booking.booking_id}>

                                <td>

                                    {booking.booking_id}

                                </td>

                                <td>

                                    {booking.full_name}

                                </td>

                                <td>

                                    {booking.product_name}

                                </td>

                                <td>

                                    ₹ {booking.advance_amount}

                                </td>

                                <td>

                                    ₹ {booking.remaining_amount}

                                </td>

                                <td>

                                    <span
                                        className={
                                            booking.booking_status==="Pending"
                                            ? "badge bg-warning"

                                            : booking.booking_status==="Accepted"
                                            ? "badge bg-primary"

                                            : booking.booking_status==="Completed"
                                            ? "badge bg-success"

                                            : "badge bg-danger"
                                        }
                                    >

                                        {booking.booking_status}

                                    </span>

                                </td>

                                <td>

    <span
        className={
            booking.payment_status === "Paid"
                ? "badge bg-success"
                : "badge bg-warning"
        }
    >
        {booking.payment_status}
    </span>

</td>

                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={()=>
                                            viewBooking(
                                                booking.booking_id
                                            )
                                        }
                                    >

                                        View

                                    </button>

                                    <button
    className="btn btn-success btn-sm me-2"
    disabled={
        booking.booking_status === "Confirmed"
    }
    onClick={() =>
        updateStatus(
            booking.booking_id,
            "Accepted"
        )
    }
>
    Accept
</button>

                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={()=>
                                            updateStatus(
                                                booking.booking_id,
                                                "Rejected"
                                            )
                                        }
                                    >

                                        Reject

                                    </button>

                                    <button
                                        className="btn btn-dark btn-sm"
                                        onClick={()=>
                                            updateStatus(
                                                booking.booking_id,
                                                "Completed"
                                            )
                                        }
                                    >

                                        Complete

                                    </button>

                                    <button
    className="btn btn-outline-danger btn-sm ms-2"
    onClick={() => deleteBooking(booking.booking_id)}
>
    Delete
</button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            {showModal && selectedBooking && (

<div
    className="modal fade show"
    style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)"
    }}
>

    <div className="modal-dialog modal-lg">

        <div className="modal-content">

            <div className="modal-header">

                <h4>

                    Booking Details

                </h4>

                <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                ></button>

            </div>

            <div className="modal-body">

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Booking ID</th>
                            <td>{selectedBooking.booking_id}</td>
                        </tr>

                        <tr>
                            <th>Customer</th>
                            <td>{selectedBooking.full_name}</td>
                        </tr>

                        <tr>
                            <th>Phone</th>
                            <td>{selectedBooking.phone}</td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>{selectedBooking.email}</td>
                        </tr>

                        <tr>
                            <th>Product</th>
                            <td>{selectedBooking.product_name}</td>
                        </tr>

                        <tr>
                            <th>Image</th>

                            <td>

                                <img
                                    src={`http://localhost:3001/uploads/${selectedBooking.image}`}
                                    width="100"
                                    alt={selectedBooking.product_name}
                                />

                            </td>

                        </tr>

                        <tr>
                            <th>Metal</th>
                            <td>{selectedBooking.metal}</td>
                        </tr>

                        <tr>
                            <th>Purity</th>
                            <td>{selectedBooking.purity}</td>
                        </tr>

                        <tr>
                            <th>Weight</th>
                            <td>{selectedBooking.weight}</td>
                        </tr>

                        <tr>
                            <th>Price</th>
                            <td>₹ {selectedBooking.price}</td>
                        </tr>

                        <tr>
                            <th>Advance Amount</th>
                            <td>₹ {selectedBooking.advance_amount}</td>
                        </tr>

                        <tr>
                            <th>Remaining Amount</th>
                            <td>₹ {selectedBooking.remaining_amount}</td>
                        </tr>

                        <tr>
                            <th>Delivery Type</th>
                            <td>{selectedBooking.delivery_type}</td>
                        </tr>

                        <tr>
                            <th>Booking Date</th>
                            <td>{selectedBooking.booking_date}</td>
                        </tr>

                        <tr>
                            <th>Expiry Date</th>
                            <td>{selectedBooking.booking_expiry}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{selectedBooking.booking_status}</td>
                        </tr>

                        <tr>
                            <th>Owner Remark</th>
                            <td>{selectedBooking.owner_remark}</td>
                        </tr>

                    </tbody>

                </table>

            </div>

            <div className="modal-footer">

                <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>

            </div>

        </div>

    </div>

</div>

)}

</div>

);

}

export default Bookings;