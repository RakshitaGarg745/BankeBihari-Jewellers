import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPurchase() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);

    const [supplierId, setSupplierId] = useState("");

    const [purchaseDate, setPurchaseDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [paymentStatus, setPaymentStatus] = useState("Paid");

    const [amountPaid, setAmountPaid] = useState(0);

    const [remarks, setRemarks] = useState("");

    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [purchasePrice, setPurchasePrice] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {

        fetchSuppliers();

        fetchProducts();

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
        // ================= ADD PRODUCT =================

        const addItem = () => {

            if (!selectedProduct) {
    
                alert("Select Product");
    
                return;
    
            }
    
            if (quantity <= 0) {
    
                alert("Enter Quantity");
    
                return;
    
            }
    
            if (purchasePrice <= 0) {
    
                alert("Enter Purchase Price");
    
                return;
    
            }
    
            const product = products.find(
    
                (p) => p.product_id == selectedProduct
    
            );
    
            setItems([
    
                ...items,
    
                {
    
                    product_id: product.product_id,
    
                    product_name: product.product_name,
    
                    quantity: Number(quantity),
    
                    purchase_price: Number(purchasePrice),
    
                    subtotal:
                        Number(quantity) *
                        Number(purchasePrice)
    
                }
    
            ]);
    
            setSelectedProduct("");
    
            setQuantity(1);
    
            setPurchasePrice("");
    
        };
    
        // ================= REMOVE PRODUCT =================
    
        const removeItem = (index) => {
    
            const updated = [...items];
    
            updated.splice(index, 1);
    
            setItems(updated);
    
        };
    
        // ================= TOTAL =================
    
        const totalAmount = items.reduce(
    
            (sum, item) =>
    
                sum + item.subtotal,
    
            0
    
        );
    
        const amountDue =
    
            totalAmount - Number(amountPaid || 0);

                // ================= SAVE PURCHASE =================

    const savePurchase = async () => {

        if (!supplierId) {

            alert("Please Select Supplier");

            return;

        }

        if (items.length === 0) {

            alert("Please Add At Least One Product");

            return;

        }

        try {

            await axios.post(

               `${process.env.REACT_APP_API_URL}/purchases`,

                {

                    supplier_id: supplierId,

                    purchase_date: purchaseDate,

                    total_amount: totalAmount,

                    payment_status: paymentStatus,

                    amount_paid: amountPaid,

                    amount_due: amountDue,

                    remarks,

                    items

                }

            );

            alert("Purchase Saved Successfully");

            navigate("/admin/purchases");

        } catch (err) {

            console.log(err);

            alert("Unable To Save Purchase");

        }

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>New Purchase</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/purchases")}
                >
                    Back
                </button>

            </div>

            <div className="card">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <label className="form-label">Supplier</label>

                            <select
                                className="form-select"
                                value={supplierId}
                                onChange={(e) => setSupplierId(e.target.value)}
                            >

                                <option value="">Select Supplier</option>

                                {

                                    suppliers.map((supplier) => (

                                        <option
                                            key={supplier.supplier_id}
                                            value={supplier.supplier_id}
                                        >

                                            {supplier.supplier_name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">

                                Purchase Date

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={purchaseDate}
                                onChange={(e)=>setPurchaseDate(e.target.value)}
                            />

                        </div>

                    </div>

                    <hr />

                    <div className="row">

                        <div className="col-md-4">

                            <label>Product</label>

                            <select
                                className="form-select"
                                value={selectedProduct}
                                onChange={(e)=>setSelectedProduct(e.target.value)}
                            >

                                <option value="">Select Product</option>

                                {

                                    products.map((product)=>(

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

                        <div className="col-md-2">

                            <label>Quantity</label>

                            <input
                                type="number"
                                className="form-control"
                                value={quantity}
                                onChange={(e)=>setQuantity(e.target.value)}
                            />

                        </div>

                        <div className="col-md-3">

                            <label>Purchase Price</label>

                            <input
                                type="number"
                                className="form-control"
                                value={purchasePrice}
                                onChange={(e)=>setPurchasePrice(e.target.value)}
                            />

                        </div>

                        <div className="col-md-3 d-flex align-items-end">

                            <button
                                className="btn btn-success w-100"
                                onClick={addItem}
                            >

                                + Add Product

                            </button>

                        </div>

                    </div>

                    <br />

                    <table className="table table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                items.map((item,index)=>(

                                    <tr key={index}>

                                        <td>{item.product_name}</td>

                                        <td>{item.quantity}</td>

                                        <td>₹ {item.purchase_price}</td>

                                        <td>₹ {item.subtotal}</td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={()=>removeItem(index)}
                                            >

                                                Remove

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                    <div className="row mt-4">

                        <div className="col-md-4">

                            <label>Payment Status</label>

                            <select
                                className="form-select"
                                value={paymentStatus}
                                onChange={(e)=>setPaymentStatus(e.target.value)}
                            >

                                <option value="Paid">Paid</option>
                                <option value="Partial">Partial</option>
                                <option value="Pending">Pending</option>

                            </select>

                        </div>

                        <div className="col-md-4">

                            <label>Amount Paid</label>

                            <input
                                type="number"
                                className="form-control"
                                value={amountPaid}
                                onChange={(e)=>setAmountPaid(e.target.value)}
                            />

                        </div>

                        <div className="col-md-4">

                            <label>Amount Due</label>

                            <input
                                type="number"
                                className="form-control"
                                value={amountDue}
                                readOnly
                            />

                        </div>

                    </div>

                    <div className="mt-3">

                        <label>Remarks</label>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={remarks}
                            onChange={(e)=>setRemarks(e.target.value)}
                        />

                    </div>

                    <div className="mt-4">

                        <h4>Total Amount : ₹ {totalAmount}</h4>

                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={savePurchase}
                    >

                        Save Purchase

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddPurchase;