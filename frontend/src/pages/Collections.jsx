import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

function Collections() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleCart = async (productId) => {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please Login First");
            navigate("/login");
            return;

        }

        try {

            await addToCart(productId);

            alert("Added To Cart Successfully");

        } catch (err) {

            console.log(err);

            alert("Unable To Add Product");

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

            alert("Added To Wishlist ❤️");

        } catch (err) {

            console.log(err);

            alert("Unable To Add Wishlist");

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

            <h2 className="text-center fw-bold mb-5">

                Our Jewellery Collection

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

                                    <div className="card h-100 shadow">

                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
                                            alt={product.product_name}
                                            className="card-img-top"
                                            style={{
                                                height: "280px",
                                                objectFit: "cover"
                                            }}
                                        />

                                        <div className="card-body">

                                            <h5 className="fw-bold">

                                                {product.product_name}

                                            </h5>

                                            <p className="text-warning fw-bold fs-5">

                                                ₹ {product.price}

                                            </p>

                                            <p>

                                                <strong>Category :</strong> {product.category}

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

                                            <div className="d-grid gap-2">

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
                                                    onClick={() =>
                                                        navigate(`/product/${product.product_id}`)
                                                    }
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

export default Collections;