import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBooking() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");

    const [bookingDate, setBookingDate] = useState("");
    const [bookingExpiry, setBookingExpiry] = useState("");

    const [advanceAmount, setAdvanceAmount] = useState("");
    const [remainingAmount, setRemainingAmount] = useState("");

    const [deliveryType, setDeliveryType] = useState("Visit Shop");

    useEffect(() => {

        fetchCustomers();
        fetchProducts();

    }, []);

    const fetchCustomers = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/customers`
            );

            setCustomers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
               `${process.env.REACT_APP_API_URL}/products`
            );

            setProducts(res.data);

        } catch (err) {

            console.log(err);

        }

    };


        // ==========================
    // Auto Calculate Remaining
    // ==========================

    const calculateRemaining = () => {

        const product = products.find(
            (p) => p.product_id == productId
        );

        if (!product) return;

        const remain =
            Number(product.price) - Number(advanceAmount || 0);

        setRemainingAmount(remain);

    };

    useEffect(() => {

        calculateRemaining();

    }, [advanceAmount, productId]);

    // ==========================
    // Save Booking
    // ==========================

    const saveBooking = async () => {

        try {

            if (!customerId) {

                alert("Select Customer");

                return;

            }

            if (!productId) {

                alert("Select Product");

                return;

            }

            await axios.post(

                `${process.env.REACT_APP_API_URL}/booking/admin/add`,

                {

                    customer_id: customerId,

                    product_id: productId,

                    booking_date: bookingDate,

                    booking_expiry: bookingExpiry,

                    advance_amount: advanceAmount,

                    remaining_amount: remainingAmount,

                    delivery_type: deliveryType

                }

            );

            alert("Booking Added Successfully");

            navigate("/admin/bookings");

        } catch (err) {

            console.log(err);

            alert("Unable To Add Booking");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Add Booking

            </h2>

            <div className="card">

                <div className="card-body">

                    <div className="mb-3">

                        <label>

                            Customer

                        </label>

                        <select
                            className="form-select"
                            value={customerId}
                            onChange={(e)=>
                                setCustomerId(e.target.value)
                            }
                        >

                            <option value="">

                                Select Customer

                            </option>

                            {

                                customers.map(customer=>(

                                    <option
                                        key={customer.customer_id}
                                        value={customer.customer_id}
                                    >

                                        {customer.full_name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>

                            Product

                        </label>

                        <select
                            className="form-select"
                            value={productId}
                            onChange={(e)=>
                                setProductId(e.target.value)
                            }
                        >

                            <option value="">

                                Select Product

                            </option>

                            {

                                products.map(product=>(

                                    <option
                                        key={product.product_id}
                                        value={product.product_id}
                                    >

                                        {product.product_name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="row">

                        <div className="col-md-6">

                            <label>

                                Booking Date

                            </label>

                            <input
    type="date"
    className="form-control"
    value={bookingDate}
    onChange={(e) => {

        const date = e.target.value;

        setBookingDate(date);

        if (date) {

            const expiry = new Date(date);

            expiry.setDate(expiry.getDate() + 4);

            const formattedDate = expiry
                .toISOString()
                .split("T")[0];

            setBookingExpiry(formattedDate);

        }

    }}
/>

                        </div>

                        <div className="col-md-6">

                            <label>

                                Expiry Date

                            </label>

                            <input
    type="date"
    className="form-control"
    value={bookingExpiry}
    readOnly
/>

                        </div>

                    </div>

                    <br />

                    <div className="row">

<div className="col-md-6">

    <label>

        Advance Amount

    </label>

    <input
        type="number"
        className="form-control"
        value={advanceAmount}
        onChange={(e)=>
            setAdvanceAmount(e.target.value)
        }
    />

</div>

<div className="col-md-6">

    <label>

        Remaining Amount

    </label>

    <input
        type="number"
        className="form-control"
        value={remainingAmount}
        readOnly
    />

</div>

</div>

<br />

<div className="mb-3">

<label>

    Delivery Type

</label>

<select
    className="form-select"
    value={deliveryType}
    onChange={(e)=>
        setDeliveryType(e.target.value)
    }
>

    <option value="Visit Shop">
        Visit Shop
    </option>

    <option value="Home Delivery">
        Home Delivery
    </option>

</select>

</div>

<button
className="btn btn-success"
onClick={saveBooking}
>

Save Booking

</button>

<button
className="btn btn-dark ms-3"
onClick={()=>
    navigate("/admin/bookings")
}
>

Back

</button>

</div>

</div>

</div>

);

}

export default AddBooking;