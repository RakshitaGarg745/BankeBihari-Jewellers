import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSupplier() {

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState({

        supplier_name: "",
        phone: "",
        email: "",
        address: ""

    });

    const handleChange = (e) => {

        setSupplier({

            ...supplier,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:3001/suppliers",

                supplier

            );

            alert("Supplier Added Successfully");

            navigate("/admin/suppliers");

        } catch (err) {

            console.log(err);

            alert("Unable To Add Supplier");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h3>Add Supplier</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Supplier Name

                            </label>

                            <input
                                type="text"
                                name="supplier_name"
                                className="form-control"
                                value={supplier.supplier_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Phone

                            </label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={supplier.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={supplier.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Address

                            </label>

                            <textarea
                                name="address"
                                className="form-control"
                                rows="4"
                                value={supplier.address}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >

                            Save Supplier

                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() =>
                                navigate("/admin/suppliers")
                            }
                        >

                            Back

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddSupplier;