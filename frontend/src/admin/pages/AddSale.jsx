import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSale() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [sale, setSale] = useState({
        customer_id: "",
        sale_date: new Date().toISOString().split("T")[0],
        sale_type: "Shop",
        amount_paid: 0
    });

    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: 1,
            price: 0
        }
    ]);

    useEffect(() => {
        loadCustomers();
        loadProducts();
    }, []);

    const loadCustomers = async () => {

        try {

            const res = await axios.get("http://localhost:3001/sales/customers");

            setCustomers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const loadProducts = async () => {

        try {

            const res = await axios.get("http://localhost:3001/sales/products");

            setProducts(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleProductChange = (index, value) => {

        const temp = [...items];

        const product = products.find(
            p => p.product_id == value
        );

        temp[index].product_id = value;
        temp[index].price = product ? Number(product.price) : 0;

        setItems(temp);

    };

    const handleQuantityChange = (index, value) => {

        const temp = [...items];

        temp[index].quantity = Number(value);

        setItems(temp);

    };

    const addProduct = () => {

        setItems([
            ...items,
            {
                product_id: "",
                quantity: 1,
                price: 0
            }
        ]);

    };

    const removeProduct = (index) => {

        const temp = [...items];

        temp.splice(index, 1);

        setItems(temp);

    };

    const totalAmount = items.reduce((sum, item) => {

        return sum + (item.quantity * item.price);

    }, 0);

    const amountLeft = totalAmount - Number(sale.amount_paid || 0);

    const saveSale = async (e) => {

        e.preventDefault();

        if (!sale.customer_id) {

            alert("Please Select Customer");

            return;

        }

        if (items.length === 0 || !items[0].product_id) {

            alert("Please Add Product");

            return;

        }

        try {

            await axios.post(

                "http://localhost:3001/sales",

                {

                    customer_id: sale.customer_id,

                    sale_date: sale.sale_date,

                    total_amount: totalAmount,

                    amount_paid: Number(sale.amount_paid),

                    amount_left: amountLeft,

                    sale_type: sale.sale_type,

                    items

                }

            );

            alert("Sale Added Successfully");

            navigate("/admin/sales");

        }

        catch (err) {

            console.log(err);

            alert("Unable To Add Sale");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Add New Sale

            </h2>

            <form onSubmit={saveSale}>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Customer</label>

                        <select

                            className="form-control"

                            value={sale.customer_id}

                            onChange={(e) =>
                                setSale({
                                    ...sale,
                                    customer_id: e.target.value
                                })
                            }

                            required

                        >

                            <option value="">Select Customer</option>

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

                    <div className="col-md-3 mb-3">

                        <label>Date</label>

                        <input

                            type="date"

                            className="form-control"

                            value={sale.sale_date}

                            onChange={(e) =>
                                setSale({
                                    ...sale,
                                    sale_date: e.target.value
                                })
                            }

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label>Sale Type</label>

                        <select

                            className="form-control"

                            value={sale.sale_type}

                            onChange={(e) =>
                                setSale({
                                    ...sale,
                                    sale_type: e.target.value
                                })
                            }

                        >

                            <option value="Shop">Shop</option>

                            <option value="Online">Online</option>

                        </select>

                    </div>

                </div>

                <hr />

                <h4>Products</h4>

                {

                    items.map((item, index) => (

                        <div className="row mb-3" key={index}>

                            <div className="col-md-5">

                                <select

                                    className="form-control"

                                    value={item.product_id}

                                    onChange={(e) =>
                                        handleProductChange(index, e.target.value)
                                    }

                                >

                                    <option value="">

                                        Select Product

                                    </option>

                                    {

                                        products.map(product => (

                                            <option

                                                key={product.product_id}

                                                value={product.product_id}

                                            >

                                                {product.product_name}

                                                {" "}
                                                (Stock: {product.stock})

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="col-md-2">

                                <input

                                    type="number"

                                    min="1"

                                    className="form-control"

                                    value={item.quantity}

                                    onChange={(e) =>
                                        handleQuantityChange(index, e.target.value)
                                    }

                                />

                            </div>

                            <div className="col-md-2">

                                <input

                                    className="form-control"

                                    value={item.price}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-2">

                                <input

                                    className="form-control"

                                    value={item.quantity * item.price}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-1">

                                {

                                    items.length > 1 && (

                                        <button

                                            type="button"

                                            className="btn btn-danger"

                                            onClick={() =>
                                                removeProduct(index)
                                            }

                                        >

                                            X

                                        </button>

                                    )

                                }

                            </div>

                        </div>

                    ))

                }

                <button

                    type="button"

                    className="btn btn-secondary mb-4"

                    onClick={addProduct}

                >

                    + Add Product

                </button>

                <div className="row">

                    <div className="col-md-4">

                        <label>Total Amount</label>

                        <input

                            className="form-control"

                            value={totalAmount}

                            readOnly

                        />

                    </div>

                    <div className="col-md-4">

                        <label>Amount Paid</label>

                        <input

                            type="number"

                            className="form-control"

                            value={sale.amount_paid}

                            onChange={(e) =>
                                setSale({
                                    ...sale,
                                    amount_paid: e.target.value
                                })
                            }

                        />

                    </div>

                    <div className="col-md-4">

                        <label>Amount Left</label>

                        <input

                            className="form-control"

                            value={amountLeft}

                            readOnly

                        />

                    </div>

                </div>

                <br />

                <button

                    type="submit"

                    className="btn btn-success"

                >

                    Save Sale

                </button>

            </form>

        </div>

    );

}

export default AddSale;