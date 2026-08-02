import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/orders/admin`
            );

            setOrders(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const viewOrder = async (id) => {

        try {
    
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/orders/admin/${id}`
            );
    
            setSelectedOrder(res.data);
    
            setShowModal(true);
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable to fetch order details");
    
        }
    
    };
    const updateStatus = async (id, status) => {

        try {

            await axios.put(
                `${process.env.REACT_APP_API_URL}/orders/admin/status/${id}`,
                {
                    order_status: status
                }
            );

            fetchOrders();

        } catch (err) {

            console.log(err);

        }

    };

    const markPaid = async (id) => {

        try {
    
            await axios.put(
                `${process.env.REACT_APP_API_URL}/orders/admin/payment/${id}`,
                {
                    payment_status: "Paid"
                }
            );
    
            fetchOrders();
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable To Update Payment");
    
        }
    
    };

    const deleteOrder = async (id) => {

        if (!window.confirm("Delete this order?")) return;

        try {

            await axios.delete(
                `${process.env.REACT_APP_API_URL}/orders/admin/${id}`
            );

            fetchOrders();

        } catch (err) {

            console.log(err);

        }

    };

    const filteredOrders = orders.filter((order) =>
        order.full_name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Order Management
            </h2>

            <div className="d-flex justify-content-between mb-3">

    <input
        className="form-control me-3"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <button
        className="btn btn-primary"
        onClick={() => navigate("/admin/add-order")}
    >
        + Add Order
    </button>

</div>

            

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

               
<tr>
    <th>Order ID</th>
    <th>Customer</th>
    <th>Total</th>
    <th>Payment Method</th>
    <th>Payment Status</th>
    <th>Status</th>
    <th>Actions</th>
</tr>
</thead>

                <tbody>

                    {

                        filteredOrders.map((order) => (

                            <tr key={order.order_id}>

<td>{order.order_id}</td>

<td>{order.full_name}</td>

<td>
    ₹ {order.total_amount}
</td>

<td>
    <span className="badge bg-dark">
        {order.payment_method}
    </span>
</td>

<td>
    <span
        className={
            order.payment_status === "Paid"
                ? "badge bg-success"
                : "badge bg-warning text-dark"
        }
    >
        {order.payment_status}
    </span>

    {
        order.payment_method === "COD" &&
        order.payment_status === "Pending" &&

        <button
            className="btn btn-success btn-sm ms-2"
            onClick={() => markPaid(order.order_id)}
        >
            Mark Paid
        </button>
    }
</td>

<td>

    <span
        className={
            order.order_status === "Pending"
                ? "badge bg-warning"

                : order.order_status === "Accepted"
                ? "badge bg-primary"

                : order.order_status === "Packed"
                ? "badge bg-info"

                : order.order_status === "Shipped"
                ? "badge bg-secondary"

                : order.order_status === "Delivered"
                ? "badge bg-success"

                : "badge bg-danger"
        }
    >
        {order.order_status}
    </span>

</td>

<td>

    <button
        className="btn btn-info btn-sm me-2"
        onClick={() => viewOrder(order.order_id)}
    >
        View
    </button>

    <button
        className="btn btn-success btn-sm me-2"
        onClick={() =>
            updateStatus(order.order_id, "Accepted")
        }
    >
        Accept
    </button>

    <button
        className="btn btn-danger btn-sm me-2"
        onClick={() =>
            updateStatus(order.order_id, "Cancelled")
        }
    >
        Reject
    </button>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() =>
            updateStatus(order.order_id, "Packed")
        }
    >
        Packed
    </button>

    <button
        className="btn btn-secondary btn-sm me-2"
        onClick={() =>
            updateStatus(order.order_id, "Shipped")
        }
    >
        Shipped
    </button>

    <button
        className="btn btn-dark btn-sm me-2"
        onClick={() =>
            updateStatus(order.order_id, "Delivered")
        }
    >
        Delivered
    </button>

    <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteOrder(order.order_id)}
    >
        Delete
    </button>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            {showModal && selectedOrder && (

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

                                <h4>Order Details</h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <table className="table table-bordered">

                                    <tbody>

                                        <tr>
                                            <th>Order ID</th>
                                            <td>{selectedOrder.order_id}</td>
                                        </tr>

                                        <tr>
                                            <th>Customer</th>
                                            <td>{selectedOrder.full_name}</td>
                                        </tr>

                                        <tr>
                                            <th>Phone</th>
                                            <td>{selectedOrder.phone}</td>
                                        </tr>

                                        <tr>
                                            <th>Payment</th>
                                            <td>{selectedOrder.payment_method}</td>
                                        </tr>

                                        <tr>
                                            <th>Total</th>
                                            <td>₹ {selectedOrder.total_amount}</td>
                                        </tr>

                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedOrder.order_status}</td>
                                        </tr>

                                        <tr>
                                            <th>Address</th>
                                            <td>
                                            {selectedOrder.address_line}
                                                <br />
                                                {selectedOrder.city}
                                                <br />
                                                {selectedOrder.state}
                                                <br />
                                                {selectedOrder.pincode}
                                            </td>
                                        </tr>

                                        <tr>

    <th>

        Products

    </th>

    <td>

        <table className="table table-bordered">

            <thead>

                <tr>

                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>

                </tr>

            </thead>

            <tbody>

                {

                    selectedOrder.items?.map((item, index) => (

                        <tr key={index}>

                            <td>

                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                                    width="60"
                                    alt={item.product_name}
                                />

                            </td>

                            <td>

                                {item.product_name}

                            </td>

                            <td>

                                {item.quantity}

                            </td>

                            <td>

                                ₹ {item.price}

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    </td>

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

export default Orders;