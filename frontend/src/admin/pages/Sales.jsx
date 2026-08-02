import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sales() {

    const [sales, setSales] = useState([]);

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3001/sales"
            );

            setSales(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const deleteSale = async (id) => {

        if (!window.confirm("Delete Sale?")) return;

        await axios.delete(

            `http://localhost:3001/sales/${id}`

        );

        fetchSales();

    };

    return (

        <div className="container">

            <div className="d-flex justify-content-between mb-3">

                <h2>Sales Management</h2>

                <Link
                    to="/admin/add-sale"
                    className="btn btn-primary"
                >

                    + New Sale

                </Link>

            </div>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Left</th>
                        <th>Type</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        sales.map((sale)=>(

                            <tr key={sale.sale_id}>

                                <td>{sale.sale_id}</td>

                                <td>{sale.full_name}</td>

                                <td>{sale.sale_date}</td>

                                <td>₹ {sale.total_amount}</td>

                                <td>₹ {sale.amount_paid}</td>

                                <td>₹ {sale.amount_left}</td>

                                <td>{sale.sale_type}</td>

                                <td>

                                    <Link

                                        className="btn btn-success btn-sm me-2"

                                        to={`/admin/sale/${sale.sale_id}`}

                                    >

                                        View

                                    </Link>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={()=>deleteSale(sale.sale_id)}

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

export default Sales;