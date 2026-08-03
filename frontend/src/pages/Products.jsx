import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {

        axios
            .get(`${process.env.REACT_APP_API_URL}/products`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    };
    const searchProduct = (value) => {

        setSearch(value);
    
        if (value === "") {
    
            loadProducts();
            return;
    
        }
    
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/search?name=${value}`)
            .then((res) => {
    
                setProducts(res.data);
    
            })
            .catch((err) => {
    
                console.log(err);
    
            });
    
    };
    const deleteProduct = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
    
        if (!confirmDelete) return;
    
        axios
            .delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then((res) => {
    
                alert(res.data.message);
    
                loadProducts(); // Refresh table
    
            })
            .catch((err) => {
    
                console.log(err);
    
                alert("Failed to Delete Product");
    
            });
    
    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-3">

                <h2>Products</h2>

                <Link
                    to="/add-product"
                    className="btn btn-success"
                >
                    + Add Product
                </Link>

            </div>
            <div className="row mb-3">

    <div className="col-md-4">

        <input

            type="text"

            className="form-control"

            placeholder="🔍 Search Product"

            value={search}

            onChange={(e) => searchProduct(e.target.value)}

        />

    </div>

</div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Metal</th>
                        <th>Purity</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Image</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map((product) => (

                            <tr key={product.product_id}>

                                <td>{product.product_id}</td>
                                <td>

    {
        product.image ?

        <img
        src={product.image}
        alt={product.product_name}
            width="80"
            height="80"
            style={{
                objectFit: "cover",
                borderRadius: "8px"
            }}
        />

        :

        <span>No Image</span>
    }

</td>

                                <td>{product.product_name}</td>

                                <td>{product.category}</td>

                                <td>{product.metal}</td>

                                <td>{product.purity}</td>

                                <td>{product.weight} g</td>

                                <td>₹ {product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    {
                                        product.stock <= 5 ?

                                            <span className="badge bg-danger">
                                                Low Stock
                                            </span>

                                            :

                                            <span className="badge bg-success">
                                                Available
                                            </span>
                                    }

                                </td>

                                <td>

                                    <Link
                                 to={`/products/${product.product_id}`}
                                 className="btn btn-primary btn-sm me-2"
                                  >
                                 View
                                </Link>

                                    
                                    <Link
                                    to={`/edit-product/${product.product_id}`}
                                    className="btn btn-warning btn-sm me-2"
                                      >
                                    Edit
                                  </Link>
                                  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteProduct(product.product_id)}
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

export default Products;