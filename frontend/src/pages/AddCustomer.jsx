import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCustomer() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        full_name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:3001/customers",
                customer
            );

            alert("Customer Added Successfully");

            navigate("/customers");

        } catch (err) {

            console.log(err);

            alert("Error");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Add Customer</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="full_name"
                    placeholder="Full Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    Add Customer
                </button>

            </form>

        </div>

    );

}

export default AddCustomer;