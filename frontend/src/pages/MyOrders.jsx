import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const res = await getMyOrders();

            setOrders(res.data.orders);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                My Orders

            </h2>

            {

                orders.length === 0 ?

                    <div className="alert alert-warning">

                        No Orders Yet

                    </div>

                    :

                    orders.map((order) => (

                        <div
                            className="card shadow mb-4"
                            key={order.order_id}
                        >

                            <div className="card-body">

                                <h4>

                                    Order #

                                    {order.order_id}

                                </h4>

                                <hr />

                                <h5>

                                    Total :

                                    ₹ {order.total_amount}

                                </h5>

                                <p>

                                    Payment :

                                    {order.payment_method}

                                </p>

                                <p>

                                    Date :

                                    {

                                        new Date(order.order_date)

                                            .toLocaleString()

                                    }

                                </p>

                                <span
                                    className="badge bg-warning text-dark"
                                >

                                    {order.order_status}

                                </span>

                                <br />
                                <br />

                                <button

                                    className="btn btn-primary"

                                    onClick={() =>
                                        navigate(
                                            `/order/${order.order_id}`
                                        )
                                    }

                                >

                                    View Details

                                </button>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default MyOrders;