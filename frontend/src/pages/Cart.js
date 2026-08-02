import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {

    getCart,

    increaseQuantity,

    decreaseQuantity,

    removeItem

} from "../services/cartService";

function Cart() {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const res = await getCart();

            setCart(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const increase = async (id) => {

        await increaseQuantity(id);

        loadCart();

    };

    const decrease = async (id) => {

        await decreaseQuantity(id);

        loadCart();

    };

    const remove = async (id) => {

        await removeItem(id);

        loadCart();

    };

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return (

        <div className="container mt-4">

            <h2>My Cart</h2>

            <hr />

            {

                cart.length === 0 ?

                    <h4>Your Cart is Empty</h4>

                    :

                    cart.map(item => (

                        <div
                            className="card p-3 mb-3"
                            key={item.cart_id}
                        >

                            <h4>{item.product_name}</h4>

                            <h5>₹ {item.price}</h5>

                            <h5>

                                Quantity :

                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => decrease(item.cart_id)}
                                >
                                    -
                                </button>

                                <span className="mx-3">

                                    {item.quantity}

                                </span>

                                <button
                                    className="btn btn-success"
                                    onClick={() => increase(item.cart_id)}
                                >
                                    +
                                </button>

                            </h5>

                            <h5>

                                Subtotal :

                                ₹ {item.price * item.quantity}

                            </h5>

                            <button
                                className="btn btn-warning"
                                onClick={() => remove(item.cart_id)}
                            >

                                Remove

                            </button>

                        </div>

                    ))

            }

            <hr />

            <h3>Total : ₹ {total}</h3>

<div className="mt-3">

<button
className="btn btn-success"
onClick={()=>navigate("/checkout")}
>

Proceed To Checkout

</button>
</div>


        </div>

    );

}

export default Cart;

