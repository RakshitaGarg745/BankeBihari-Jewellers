import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Suppliers() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchSuppliers();

    }, []);

    const fetchSuppliers = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/suppliers`
            );

            setSuppliers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const deleteSupplier = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this supplier?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${process.env.REACT_APP_API_URL}/suppliers/${id}`
            );

            fetchSuppliers();

        } catch (err) {

            console.log(err);

        }

    };

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.supplier_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
        supplier.phone.includes(search)
    );

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>Supplier Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/admin/add-supplier")
                    }
                >
                    + Add Supplier
                </button>

            </div>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Supplier..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th width="180">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredSuppliers.map((supplier) => (

                            <tr key={supplier.supplier_id}>

                                <td>{supplier.supplier_id}</td>

                                <td>{supplier.supplier_name}</td>

                                <td>{supplier.phone}</td>

                                <td>{supplier.email}</td>

                                <td>{supplier.address}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-supplier/${supplier.supplier_id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteSupplier(
                                                supplier.supplier_id
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

export default Suppliers;