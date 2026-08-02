import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);
    const searchCustomer = async () => {

        if (keyword === "") {
    
            fetchCustomers();
    
            return;
    
        }
    
        try {
    
            const res = await axios.get(
    
                `http://localhost:3001/customers/search?keyword=${keyword}`
    
            );
    
            setCustomers(res.data);
    
        } catch (err) {
    
            console.log(err);
    
        }
    
    };

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:3001/customers");
            setCustomers(res.data);
        } catch (err) {
            console.log(err);
        
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                alert(JSON.stringify(err.response.data));
            } else {
                alert(err.message);
            }
        }
    };
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );
    
        if (!confirmDelete) return;
    
        try {
    
            await axios.delete(
                `http://localhost:3001/customers/${id}`
            );
    
            alert("Customer Deleted Successfully");
    
            fetchCustomers();
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable to Delete");
    
        }
    
    };

    return (
        <div className="container mt-4">

            <h2>Customers</h2>

            <div className="mb-3">
                <Link
                    to="/customers/add"
                    className="btn btn-primary"
                >
                    Add Customer
                </Link>
            </div>
            <div className="row mb-3">

    <div className="col-md-5">

        <input
            className="form-control"
            placeholder="Search by Name, Email or Phone"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />

    </div>

    <div className="col-md-2">

        <button
            className="btn btn-success"
            onClick={searchCustomer}
        >
            Search
        </button>

    </div>

</div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_id}</td>
                            <td>{customer.full_name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>

    <Link
        to={`/customers/view/${customer.customer_id}`}
        className="btn btn-info btn-sm me-2"
    >
        View
    </Link>

    <Link
        to={`/customers/edit/${customer.customer_id}`}
        className="btn btn-warning btn-sm me-2"
    >
        Edit
    </Link>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteCustomer(customer.customer_id)}
    >
        Delete
    </button>

</td>
</tr>
                    ))}
                    

                </tbody>

            </table>

        </div>
    );
}

export default CustomerList;