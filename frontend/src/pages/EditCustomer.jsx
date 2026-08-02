import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {

    const { id } = useParams();
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

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {
        try {

            const res = await axios.get(
                `http://localhost:3001/customers/${id}`
            );

            setCustomer(res.data[0]);

        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:3001/customers/${id}`,
                customer
            );

            alert("Customer Updated Successfully");

            navigate("/customers");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <h2>Edit Customer</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="full_name"
                    value={customer.full_name || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="phone"
                    value={customer.phone || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    value={customer.email || ""}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    value={customer.password || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="address"
                    value={customer.address || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="city"
                    value={customer.city || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="state"
                    value={customer.state || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="pincode"
                    value={customer.pincode || ""}
                    onChange={handleChange}
                />

                <button className="btn btn-warning">
                    Update Customer
                </button>

            </form>

        </div>

    );

}

export default EditCustomer;