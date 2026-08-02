import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSupplier() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [supplier, setSupplier] = useState({
        supplier_name: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {

        const fetchSupplier = async () => {

            try {

                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/suppliers/${id}`
                );

                setSupplier(res.data);

            } catch (err) {

                console.log(err);

                alert("Unable To Fetch Supplier");

            }

        };

        fetchSupplier();

    }, [id]);

    const handleChange = (e) => {

        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `${process.env.REACT_APP_API_URL}/suppliers/${id}`,
                supplier
            );

            alert("Supplier Updated Successfully");

            navigate("/admin/suppliers");

        } catch (err) {

            console.log(err);

            alert("Unable To Update Supplier");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3>Edit Supplier</h3>

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
                            Update Supplier
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate("/admin/suppliers")}
                        >
                            Back
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditSupplier;