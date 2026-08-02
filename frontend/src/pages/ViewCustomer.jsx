import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ViewCustomer() {

    const { id } = useParams();

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/customers/${id}`
            );

            setCustomer(res.data[0]);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Customer Details</h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th width="30%">Customer ID</th>
                                <td>{customer.customer_id}</td>
                            </tr>

                            <tr>
                                <th>Full Name</th>
                                <td>{customer.full_name}</td>
                            </tr>

                            <tr>
                                <th>Phone</th>
                                <td>{customer.phone}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{customer.email}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{customer.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{customer.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{customer.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{customer.pincode}</td>
                            </tr>

                            <tr>
                                <th>Role</th>
                                <td>{customer.role}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{customer.status}</td>
                            </tr>

                            <tr>
                                <th>Created At</th>
                                <td>{customer.created_at}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/customers"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewCustomer;