import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PurchaseDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [purchase, setPurchase] = useState(null);

    const [items, setItems] = useState([]);

    useEffect(() => {

        fetchPurchase();

    }, []);

    const fetchPurchase = async () => {

        try {

            const res = await axios.get(

                `http://localhost:3001/purchases/${id}`

            );

            setPurchase(res.data.purchase);

            setItems(res.data.items);

        } catch (err) {

            console.log(err);

        }

    };

    if (!purchase) {

        return <h4 className="m-4">Loading...</h4>;

    }

    return (

        <div className="container mt-4">

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/admin/purchases")}
            >

                Back

            </button>

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h3>

                        Purchase # {purchase.purchase_id}

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <p>

                            <strong>Supplier :</strong>

{purchase.supplier_name}

                            </p>

                            <p>

                                <strong>Date :</strong>

                                {purchase.purchase_date?.substring(0,10)}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>Status :</strong>

                                {purchase.payment_status}

                            </p>

                            <p>

                                <strong>Total :</strong>

                                ₹ {purchase.total_amount}

                            </p>

                        </div>

                    </div>

                    <hr />

                    <h4>Purchased Products</h4>

                    <table className="table table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>Product</th>

                                <th>Quantity</th>

                                <th>Purchase Price</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                items.map((item)=>(

                                    <tr key={item.purchase_item_id}>

                                        <td>

                                            {item.product_name}

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td>

                                            ₹ {item.purchase_price}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                    <div className="mt-4">

                        <h5>

                            Amount Paid :

                            ₹ {purchase.amount_paid}

                        </h5>

                        <h5>

                            Amount Due :

                            ₹ {purchase.amount_due}

                        </h5>

                    </div>

                    {

                        purchase.remarks &&

                        <div className="alert alert-info mt-3">

                            <strong>Remarks</strong>

                            <br />

                            {purchase.remarks}

                        </div>

                    }

                </div>

            </div>

        </div>

    );

}

export default PurchaseDetails;