import { useEffect, useState } from "react";
import { getOrderDetails } from "../services/orderService";
import { useParams } from "react-router-dom";

function OrderDetails() {

    const { id } = useParams();

    const [items, setItems] = useState([]);

    useEffect(() => {

        loadItems();

    }, []);

    const loadItems = async () => {

        try {

            const res = await getOrderDetails(id);

            setItems(res.data.items);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <h2>

                Order Details

            </h2>

            <hr />

            {items.length > 0 && (

<div className="alert alert-info mb-4">

    <h5>

        Order Status :
        <strong> {items[0].order_status}</strong>

    </h5>

    <p className="mb-0">

        Order Date :
        {new Date(items[0].order_date).toLocaleDateString()}

    </p>

</div>

)}

            {

                items.map(item => (

                    <div

                        className="card mb-3 p-3"

                        key={item.order_item_id}

                    >

                        <div className="row">

                            <div className="col-md-3">

                                <img

                                    src={item.image}

                                    alt=""

                                    className="img-fluid"

                                />

                            </div>

                            <div className="col-md-9">

                                <h4>

                                    {item.product_name}

                                </h4>

                                <h5>

                                    ₹ {item.price}

                                </h5>

                                <h6>

                                    Quantity :

                                    {item.quantity}

                                </h6>

                                <h5>

                                    Total :

                                    ₹ {item.price * item.quantity}

                                </h5>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderDetails;