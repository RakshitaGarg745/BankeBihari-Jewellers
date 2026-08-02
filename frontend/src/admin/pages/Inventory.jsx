import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Inventory() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [stats,setStats]=useState({

        totalProducts:0,
    
        inventoryValue:0,
    
        lowStock:0,
    
        outOfStock:0
    
    });

    useEffect(() => {

        fetchInventory();

    }, []);

    const fetchInventory = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/inventory`
            );

            setProducts(res.data);
            const statsRes =
await axios.get(
`${process.env.REACT_APP_API_URL}/inventory/stats`
);

setStats(statsRes.data);

        } catch (err) {

            console.log(err);

        }

    };

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.product_name
                .toLowerCase()
                .includes(search.toLowerCase());
    
        if (!matchesSearch)
            return false;
    
        if (filter === "All")
            return true;
    
        if (filter === "In Stock")
            return product.stock > 10;
    
        if (filter === "Low Stock")
            return product.stock > 0 && product.stock <= 10;
    
        if (filter === "Out Of Stock")
            return product.stock === 0;
    
        return true;
    
    });

    const getStatus = (stock) => {

        if (stock === 0)
            return {
                text: "Out Of Stock",
                color: "danger"
            };

        if (stock <= 10)
            return {
                text: "Low Stock",
                color: "warning"
            };

        return {
            text: "In Stock",
            color: "success"
        };

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Inventory Management

            </h2>
            <div className="row mb-4">

<div className="col-md-3">

<div className="card bg-primary text-white">

<div className="card-body">

<h5>Total Products</h5>

<h2>{stats.totalProducts}</h2>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card bg-success text-white">

<div className="card-body">

<h5>Inventory Value</h5>

<h4>

₹ {stats.inventoryValue}

</h4>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card bg-warning">

<div className="card-body">

<h5>Low Stock</h5>

<h2>

{stats.lowStock}

</h2>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card bg-danger text-white">

<div className="card-body">

<h5>Out Of Stock</h5>

<h2>

{stats.outOfStock}

</h2>

</div>

</div>

</div>

</div>
<div className="mb-3">

    <button
        className={`btn me-2 ${
            filter === "All"
                ? "btn-dark"
                : "btn-outline-dark"
        }`}
        onClick={() => setFilter("All")}
    >
        All
    </button>

    <button
        className={`btn me-2 ${
            filter === "In Stock"
                ? "btn-success"
                : "btn-outline-success"
        }`}
        onClick={() => setFilter("In Stock")}
    >
        In Stock
    </button>

    <button
        className={`btn me-2 ${
            filter === "Low Stock"
                ? "btn-warning"
                : "btn-outline-warning"
        }`}
        onClick={() => setFilter("Low Stock")}
    >
        Low Stock
    </button>

    <button
        className={`btn ${
            filter === "Out Of Stock"
                ? "btn-danger"
                : "btn-outline-danger"
        }`}
        onClick={() => setFilter("Out Of Stock")}
    >
        Out Of Stock
    </button>

</div>

            <input
                className="form-control mb-3"
                placeholder="Search Product..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Product</th>

                        <th>Category</th>

                        <th>Metal</th>

                        <th>Purity</th>

                        <th>Stock</th>

                        <th>Price</th>

<th>Inventory Value</th>

<th>Supplier</th>

<th>Last Purchase</th>

<th>Status</th>

<th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredProducts.map((product)=>(

                            <tr key={product.product_id}>

                                <td>

                                    {product.product_id}

                                </td>

                                <td>

                                    {product.product_name}

                                </td>

                                <td>

                                    {product.category}

                                </td>

                                <td>

                                    {product.metal}

                                </td>

                                <td>

                                    {product.purity}

                                </td>

                                <td>

                                    {product.stock}

                                </td>

                                <td>

₹ {product.price}

</td>

<td>

₹ {product.inventory_value}

</td>

<td>

{

product.supplier_name ||

"-"

}

</td>

<td>

{

product.last_purchase ?

product.last_purchase.substring(0,10)

:

"-"

}

</td>

<td>

<span
className={`badge bg-${getStatus(product.stock).color}`}
>

{getStatus(product.stock).text}

</span>

</td>

<td>

<button

className="btn btn-primary btn-sm"

onClick={()=>

navigate(

`/admin/add-purchase?product=${product.product_id}`

)

}

>

Restock

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

export default Inventory;