import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddOrder() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState({
        full_name: "",
        phone: "",
        address_line: "",
        city: "",
        state: "",
        pincode: ""
    });
    const [customerId, setCustomerId] = useState("");
    
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: 1
        }
    ]);

    useEffect(() => {

        fetchCustomers();
        fetchProducts();

    }, []);

    // -----------------------
    // Customers
    // -----------------------

    const fetchCustomers = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3001/customers"
            );

            setCustomers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // -----------------------
    // Products
    // -----------------------

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3001/products"
            );

            setProducts(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    // -----------------------
    // Addresses
    // -----------------------

   

    // -----------------------
    // Customer Change
    // -----------------------

    const handleCustomer = (e) => {

        const id = e.target.value;
    
        setCustomerId(id);
    
        const customer = customers.find(
            (c) => c.customer_id == id
        );
    
        if (customer) {
    
            setAddress({
                full_name: customer.full_name,
                phone: customer.phone,
                address_line: "",
                city: "",
                state: "",
                pincode: ""
            });
    
        }
    
    };

    // -----------------------
    // Product Change
    // -----------------------

    const handleProductChange = (
        index,
        field,
        value
    ) => {

        const data = [...items];

        data[index][field] = value;

        setItems(data);

    };

    // -----------------------
    // Add Product Row
    // -----------------------

    const addRow = () => {

        setItems([
            ...items,
            {
                product_id: "",
                quantity: 1
            }
        ]);

    };

    // -----------------------
    // Remove Product Row
    // -----------------------

    const removeRow = (index) => {

        const data = [...items];

        data.splice(index,1);

        setItems(data);

    };

        // -----------------------
    // Save Order
    // -----------------------

    const saveOrder = async () => {
        alert("NEW SAVE ORDER FUNCTION");
        try {

            if (!customerId) {

                alert("Select Customer");

                return;

            }


            for (let item of items) {

                if (!item.product_id) {

                    alert("Select Product");

                    return;

                }

            }

            

            await axios.post(
                "http://localhost:3001/orders/admin/add",
                {
                    customer_id: customerId,
                    payment_method: paymentMethod,
                    address,
                    items
                }
            ); 
         

            alert("Order Added Successfully");

            navigate("/admin/orders");

        } catch (err) {

            console.log(err);

            alert("Unable To Add Order");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Add New Order

            </h2>

            <div className="card">

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">

                            Customer

                        </label>

                        <select
                            className="form-select"
                            value={customerId}
                            onChange={handleCustomer}
                        >

                            <option value="">

                                Select Customer

                            </option>

                            {

                                customers.map(customer => (

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
    <label>Full Name</label>

    <input
        className="form-control"
        value={address.full_name}
        onChange={(e)=>
            setAddress({
                ...address,
                full_name:e.target.value
            })
        }
    />
</div>

<div className="mb-3">
    <label>Phone</label>

    <input
        className="form-control"
        value={address.phone}
        onChange={(e)=>
            setAddress({
                ...address,
                phone:e.target.value
            })
        }
    />
</div>

<div className="mb-3">
    <label>Address</label>

    <textarea
        className="form-control"
        value={address.address_line}
        onChange={(e)=>
            setAddress({
                ...address,
                address_line:e.target.value
            })
        }
    />
</div>

<div className="row">

    <div className="col-md-4">

        <input
            className="form-control"
            placeholder="City"
            value={address.city}
            onChange={(e)=>
                setAddress({
                    ...address,
                    city:e.target.value
                })
            }
        />

    </div>

    <div className="col-md-4">

        <input
            className="form-control"
            placeholder="State"
            value={address.state}
            onChange={(e)=>
                setAddress({
                    ...address,
                    state:e.target.value
                })
            }
        />

    </div>

    <div className="col-md-4">

        <input
            className="form-control"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e)=>
                setAddress({
                    ...address,
                    pincode:e.target.value
                })
            }
        />

    </div>

</div>

                    

                    <div className="mb-3">

                        <label className="form-label">

                            Payment Method

                        </label>

                        <select
    className="form-select"
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
>

    <option value="COD">Cash On Delivery</option>

    <option value="Online">Online Payment</option>

</select>
                    </div>

                    <hr />

                    <h5>

                        Products

                    </h5>


                    {

items.map((item,index)=>(

    <div
        className="row mb-3"
        key={index}
    >

        <div className="col-md-6">

            <select
                className="form-select"
                value={item.product_id}
                onChange={(e)=>
                    handleProductChange(
                        index,
                        "product_id",
                        e.target.value
                    )
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
                            {" "}
                            (₹{product.price})

                        </option>

                    ))

                }

            </select>

        </div>

        <div className="col-md-3">

            <input
                type="number"
                min="1"
                className="form-control"
                value={item.quantity}
                onChange={(e)=>
                    handleProductChange(
                        index,
                        "quantity",
                        e.target.value
                    )
                }
            />

        </div>

        <div className="col-md-3">

            <button
                className="btn btn-danger"
                onClick={()=>
                    removeRow(index)
                }
            >

                Remove

            </button>

        </div>

    </div>

))

}

<button
className="btn btn-secondary mb-3"
onClick={addRow}
>

+ Add Product

</button>

<br />

<button
className="btn btn-success"
onClick={saveOrder}
>

Save Order

</button>

<button
className="btn btn-dark ms-3"
onClick={()=>
    navigate("/admin/orders")
}
>

Back

</button>

</div>

</div>

</div>

);

}

export default AddOrder;