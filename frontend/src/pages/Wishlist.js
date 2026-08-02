import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";

function Wishlist() {

    const [items, setItems] = useState([]);

    const loadWishlist = async () => {

        try {

            const res = await getWishlist();

            setItems(res.data);

        } catch {

            alert("Unable to load wishlist");

        }

    };

    useEffect(() => {

        loadWishlist();

    }, []);

    const removeItem = async (id) => {

        await removeFromWishlist(id);

        loadWishlist();

    };

    return (

        <div className="container mt-4">

            <h2>❤️ My Wishlist</h2>

            <div className="row">

                {
                    items.map(item => (

                        <div className="col-md-4 mb-4" key={item.wishlist_id}>

                            <div className="card h-100">

                                <img
                                    src={`http://localhost:3001/uploads/${item.image}`}
                                    className="card-img-top"
                                    alt={item.product_name}
                                    style={{ height: "250px", objectFit: "cover" }}
                                />

                                <div className="card-body">

                                    <h5>{item.product_name}</h5>

                                    <p>₹ {item.price}</p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeItem(item.wishlist_id)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default Wishlist;