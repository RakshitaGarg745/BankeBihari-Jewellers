import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function SaleDetails() {

    const { id } = useParams();

    const [sale, setSale] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {

        fetchSale();

    }, []);

    const fetchSale = async () => {

        try {

            const res = await axios.get(
                `http://localhost:3001/sales/${id}`
            );

            setSale(res.data.sale);
            setItems(res.data.items);

        } catch (err) {

            console.log(err);

            alert("Unable To Fetch Sale Details");

        }

    };

    if (!sale) {

        return (

            <div className="container mt-5">

                <h3>Loading...</h3>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>Sale Details</h2>

                <Link
                    to="/admin/sales"
                    className="btn btn-secondary"
                >
                    Back
                </Link>
                <div className="d-flex justify-content-between mb-3">

    <h2>Sale Details</h2>

    <div>

        <button
            className="btn btn-success me-2"
            onClick={() =>
                window.open(
                    `http://localhost:3001/invoice/${id}`,
                    "_blank"
                )
            }
        >
            🖨 Print Invoice
        </button>

        <a
            href={`http://localhost:3001/invoice/${id}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
        >
            ⬇ Download Invoice
        </a>

        <Link
            to="/admin/sales"
            className="btn btn-secondary ms-2"
        >
            Back
        </Link>

    </div>

</div>

            </div>

            <div className="card p-3 mb-4">

                <div className="row">

                    <div className="col-md-6">

                        <p><strong>Sale ID :</strong> {sale.sale_id}</p>

                        <p><strong>Customer :</strong> {sale.full_name}</p>

                        <p><strong>Sale Date :</strong> {sale.sale_date}</p>

                    </div>

                    <div className="col-md-6">

                        <p><strong>Sale Type :</strong> {sale.sale_type}</p>

                        <p><strong>Total :</strong> ₹ {sale.total_amount}</p>

                        <p><strong>Paid :</strong> ₹ {sale.amount_paid}</p>

                        <p><strong>Left :</strong> ₹ {sale.amount_left}</p>

                    </div>

                </div>

            </div>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>Product</th>

                        <th>Quantity</th>

                        <th>Price</th>

                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        items.map(item => (

                            <tr key={item.sale_item_id}>

                                <td>{item.product_name}</td>

                                <td>{item.quantity}</td>

                                <td>₹ {item.price}</td>

                                <td>₹ {item.price * item.quantity}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default SaleDetails;