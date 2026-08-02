import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";


function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const handleBookNow = () => {

        const token = localStorage.getItem("token");
    
        if (!token) {
    
            alert("Please Login First");
    
            navigate("/login");
    
            return;
    
        }
    
        navigate("/booking", {
            state: {
                product
            }
        });
    
    };

    const [product, setProduct] = useState(null);


    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchProduct();
    
    }, [id]);
    const handleAddToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please Login First");
            navigate("/login");
            return;
        }

        try {

            await addToCart(product.product_id);

            alert("Product Added To Cart");

        } catch (err) {

            console.log(err);
        
            if (err.response) {
        
                console.log("Status:", err.response.status);
                console.log("Data:", err.response.data);
        
                alert(JSON.stringify(err.response.data));
        
            } else {
        
                alert(err.message);
        
            }
        
        }
    };
    const handleWishlist = async () => {

        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Please Login First");
            navigate("/login");
            return;
        }
    
        try {
    
            console.log("Wishlist Button Clicked");
            console.log("Product ID:", product.product_id);
    
            const res = await addToWishlist(product.product_id);
    
            console.log(res.data);
    
            alert("Added to Wishlist ❤️");
    
        } catch (err) {
    
            console.log("Wishlist Error:", err);
    
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Unable to Add Wishlist");
            }
    
        }
    
    };
    if (!product) {

        return (
            <div className="container mt-5">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h2>{product.product_name}</h2>

                <hr />

                <p><strong>Category :</strong> {product.category}</p>

                <p><strong>Metal :</strong> {product.metal}</p>

                <p><strong>Purity :</strong> {product.purity}</p>

                <p><strong>Weight :</strong> {product.weight} g</p>

                <p><strong>Making Charges :</strong> ₹ {product.making_charges}</p>

                <p><strong>Price :</strong> ₹ {product.price}</p>

                <p><strong>Stock :</strong> {product.stock}</p>

                <p><strong>Description :</strong></p>

                <p>{product.description}</p>

                <div className="mt-3">

    <button
        className="btn btn-success me-2"
        onClick={handleAddToCart}
    >
        Add To Cart
    </button>

    <button
        className="btn btn-warning me-2"
        onClick={handleBookNow}
    >
        📖 Book Now
    </button>

    <button
        className="btn btn-danger"
        onClick={handleWishlist}
    >
        ❤️ Wishlist
    </button>

</div>

            </div>

        </div>

    );
}

export default ProductDetails;