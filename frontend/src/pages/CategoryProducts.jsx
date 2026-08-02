import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import "./CategoryProducts.css";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

function CategoryProducts() {

    const { category } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCart = async (productId) => {

        try {
    
            await addToCart(productId);
    
            alert("Added to Cart Successfully");
    
        }
        catch (err) {
    
            if (err.response?.status === 401) {
    
                alert("Please login first");
    
            } else {
    
                console.log(err);
    
                alert("Something went wrong");
    
            }
    
        }
    
    };
    const handleWishlist = async (productId) => {

        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Please Login First");
            navigate("/login");
            return;
        }
    
        try {
    
            await addToWishlist(productId);
    
            alert("Added to Wishlist ❤️");
    
        } catch (err) {
    
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                console.log(err);
                alert("Unable to Add Wishlist");
            }
    
        }
    
    };

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {

        try {

            const data = await getProductsByCategory(category);

            setProducts(data);

        } catch (err) {
            console.log("FULL ERROR:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);
            console.log("Status:", err.response?.status);
        
            alert(JSON.stringify(err.response?.data || err.message));
        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center fw-bold mb-4">

                {category}

            </h2>

            <div className="row">

                {

                    products.length === 0 ?

                        (

                            <div className="text-center">

                                <h4>No Products Found</h4>

                            </div>

                        )

                        :

                        (

                            products.map((product) => (

                                <div
                                    className="col-lg-4 col-md-6 mb-4"
                                    key={product.product_id}
                                >

                                    <div className="card product-card h-100">

                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                                            className="card-img-top product-image"
                                            alt={product.product_name}
                                        />

                                        <div className="card-body">

                                            <h5 className="fw-bold">

                                                {product.product_name}

                                            </h5>

                                            <p className="text-warning fw-bold fs-5">

                                                ₹ {product.price}

                                            </p>

                                            <p>

                                                <strong>Weight :</strong> {product.weight} g

                                            </p>

                                            <p>

                                                <strong>Purity :</strong> {product.purity}

                                            </p>

                                            <p>

                                                <strong>Stock :</strong> {product.stock}

                                            </p>

                                            <div className="d-grid gap-2 mt-3">

                                            <button
    className="btn btn-outline-danger"
    onClick={() => handleWishlist(product.product_id)}
>
    ❤️ Wishlist
</button>

                                                <button
    className="btn btn-warning"
    onClick={() => handleCart(product.product_id)}
>
    🛒 Add To Cart
</button>

                                                <button
    className="btn btn-dark"
    onClick={() => navigate(`/product/${product.product_id}`)}
>
    👁 View Details
</button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

        </div>

    );

}

export default CategoryProducts;