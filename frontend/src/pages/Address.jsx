import { useEffect, useState } from "react";
import { addAddress, getAddresses } from "../services/addressService";

function Address() {

    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        address_type: "Home"
    });

    const [addresses, setAddresses] = useState([]);

    const loadAddresses = async () => {
        try {
            const res = await getAddresses();
            setAddresses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addAddress(form);

            alert("Address Saved");

            setForm({
                full_name: "",
                phone: "",
                address_line: "",
                city: "",
                state: "",
                pincode: "",
                address_type: "Home"
            });

            loadAddresses();

        } catch (err) {

            console.log(err);

            alert("Unable to Save Address");
        }
    };

    return (

        <div className="container mt-4">

            <h2>My Addresses</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-2"
                    placeholder="Full Name"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Address"
                    name="address_line"
                    value={form.address_line}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Pincode"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="address_type"
                    value={form.address_type}
                    onChange={handleChange}
                >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Other</option>
                </select>

                <button className="btn btn-primary">
                    Save Address
                </button>

            </form>

            <hr />

            {addresses.map((item) => (

                <div
                    key={item.address_id}
                    className="card p-3 mb-3"
                >

                    <h5>{item.full_name}</h5>

                    <p>
                        {item.address_line},
                        {" "}
                        {item.city},
                        {" "}
                        {item.state}
                    </p>

                    <p>{item.phone}</p>

                    <span className="badge bg-success">
                        {item.address_type}
                    </span>

                </div>

            ))}

        </div>

    );
}

export default Address;