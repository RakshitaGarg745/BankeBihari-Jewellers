import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Purchases() {

    const navigate = useNavigate();

    const [purchases, setPurchases] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchPurchases();

    }, []);

    const fetchPurchases = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/purchases`
            );

            setPurchases(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const deletePurchase = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this purchase?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${process.env.REACT_APP_API_URL}/purchases/${id}`
            );

            fetchPurchases();

        } catch (err) {

            console.log(err);

        }

    };

    const filteredPurchases = purchases.filter((purchase) =>

        purchase.supplier_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>

                    Purchase Management

                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/admin/add-purchase")
                    }
                >

                    + New Purchase

                </button>

            </div>

            <input
                className="form-control mb-3"
                placeholder="Search Supplier..."
                value={search}
                onChange={(e)=>
                    setSearch(e.target.value)
                }
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Due</th>
                        <th>Status</th>
                        <th width="180">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredPurchases.map((purchase)=>(

                            <tr
                                key={purchase.purchase_id}
                            >

                                <td>

                                    {purchase.purchase_id}

                                </td>

                                <td>

                                    {purchase.supplier_name}

                                </td>

                                <td>

                                    {purchase.purchase_date?.substring(0,10)}

                                </td>

                                <td>

                                    ₹ {purchase.total_amount}

                                </td>

                                <td>

                                    ₹ {purchase.amount_paid}

                                </td>

                                <td>

                                    ₹ {purchase.amount_due}

                                </td>

                                <td>

                                    {purchase.payment_status}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() =>
                                            navigate(
                                                `/admin/purchase/${purchase.purchase_id}`
                                            )
                                        }
                                    >

                                        View

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deletePurchase(
                                                purchase.purchase_id
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Purchases;