import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });
    const [search, setSearch] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });
    
    const [editingId, setEditingId] = useState(null);
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3001/customers"
            );

            console.log(res.data);

            setCustomers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const openEditModal = (customer) => {

        setEditingId(customer.customer_id);
    
        setEditingCustomer({
            full_name: customer.full_name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pincode
        });
    
    };
    const viewCustomer = (customer) => {

        setSelectedCustomer(customer);
    
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
    
            alert("Unable To Delete Customer");
    
        }
    
    };

    const updateCustomer = async () => {

        try {
    
            await axios.put(
                `http://localhost:3001/customers/${editingId}`,
                editingCustomer
            );
    
            alert("Customer Updated Successfully");
            document.querySelector("#editCustomerModal .btn-close")?.click();


    
            fetchCustomers();
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable To Update Customer");
    
        }
    
    };

    const addCustomer = async () => {

        try {
    
            await axios.post(
                "http://localhost:3001/customers",
                newCustomer
            );
    
            alert("Customer Added Successfully");
    
            fetchCustomers();
    
            setNewCustomer({
                full_name: "",
                email: "",
                phone: "",
                password: "",
                address: "",
                city: "",
                state: "",
                pincode: ""
            });
    
        } catch (err) {
    
            console.log(err);
    
            alert("Unable To Add Customer");
    
        }
    
    };

    const filteredCustomers = customers.filter((customer) =>

        customer.full_name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        customer.email
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div>

            <h2 className="mb-4">
                Customer Management
            </h2>

            <div className="d-flex justify-content-end mb-3">

    <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCustomerModal"
    >
        + Add Customer
    </button>

</div>

            <input
                className="form-control mb-4"
                placeholder="Search Customer..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredCustomers.map((customer)=>(

                            <tr key={customer.customer_id}>

                                <td>{customer.customer_id}</td>

                                <td>{customer.full_name}</td>

                                <td>{customer.email}</td>

                                <td>{customer.phone}</td>

                                <td>{customer.city}</td>

                                <td>

                                <button
className="btn btn-info btn-sm me-2"
data-bs-toggle="modal"
data-bs-target="#customerModal"
onClick={() => viewCustomer(customer)}
>
View
</button>
<button
    className="btn btn-warning btn-sm me-2"
    data-bs-toggle="modal"
    data-bs-target="#editCustomerModal"
    onClick={() => openEditModal(customer)}
>
    Edit
</button>
<button
className="btn btn-danger btn-sm"
onClick={() => deleteCustomer(customer.customer_id)}
>
Delete
</button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <div
className="modal fade"
id="customerModal"
tabIndex="-1"
>

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h4>

Customer Details

</h4>

<button
className="btn-close"
data-bs-dismiss="modal"
></button>

</div>

<div className="modal-body">

{

selectedCustomer &&

<>

<p>

<b>Name :</b>

{selectedCustomer.full_name}

</p>

<p>

<b>Email :</b>

{selectedCustomer.email}

</p>

<p>

<b>Phone :</b>

{selectedCustomer.phone}

</p>

<p>

<b>Address :</b>

{selectedCustomer.address}

</p>

<p>

<b>City :</b>

{selectedCustomer.city}

</p>

<p>

<b>State :</b>

{selectedCustomer.state}

</p>

<p>

<b>Pincode :</b>

{selectedCustomer.pincode}

</p>

</>

}

</div>

<div className="modal-footer">

<button
className="btn btn-secondary"
data-bs-dismiss="modal"
>

Close

</button>

</div>

</div>

</div>

</div>

{/* ================= Edit Customer Modal ================= */}

<div
    className="modal fade"
    id="editCustomerModal"
    tabIndex="-1"
>
    <div className="modal-dialog">
        <div className="modal-content">

            <div className="modal-header">
                <h5>Edit Customer</h5>

                <button
                    className="btn-close"
                    data-bs-dismiss="modal"
                ></button>
            </div>

            <div className="modal-body">

                <input
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={editingCustomer.full_name}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            full_name: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={editingCustomer.email}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            email: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Phone"
                    value={editingCustomer.phone}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            phone: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Address"
                    value={editingCustomer.address}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            address: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="City"
                    value={editingCustomer.city}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            city: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="State"
                    value={editingCustomer.state}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            state: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Pincode"
                    value={editingCustomer.pincode}
                    onChange={(e) =>
                        setEditingCustomer({
                            ...editingCustomer,
                            pincode: e.target.value
                        })
                    }
                />

            </div>

            <div className="modal-footer">

                <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cancel
                </button>

                <button
                    className="btn btn-warning"
                    onClick={updateCustomer}
                >
                    Update Customer
                </button>

            </div>

        </div>
    </div>
</div>

<div
    className="modal fade"
    id="addCustomerModal"
    tabIndex="-1"
>
    <div className="modal-dialog">
        <div className="modal-content">

            <div className="modal-header">
                <h5>Add Customer</h5>

                <button
                    className="btn-close"
                    data-bs-dismiss="modal"
                ></button>
            </div>

            <div className="modal-body">

                <input
                    className="form-control mb-2"
                    placeholder="Full Name"
                    value={newCustomer.full_name}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            full_name: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            email: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Phone"
                    value={newCustomer.phone}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            phone: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={newCustomer.password}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            password: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Address"
                    value={newCustomer.address}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            address: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="City"
                    value={newCustomer.city}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            city: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="State"
                    value={newCustomer.state}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            state: e.target.value
                        })
                    }
                />

                <input
                    className="form-control"
                    placeholder="Pincode"
                    value={newCustomer.pincode}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            pincode: e.target.value
                        })
                    }
                />

            </div>

            <div className="modal-footer">

                <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cancel
                </button>

                <button
                    className="btn btn-primary"
                    onClick={addCustomer}
                >
                    Add Customer
                </button>

            </div>

        </div>
    </div>
</div>

</div>

    );

}

export default Customers;