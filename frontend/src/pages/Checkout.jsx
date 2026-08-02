import { useEffect, useState } from "react";
import { placeOrder } from "../services/orderService";
import { getCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import {
    createOrder,
    verifyPayment,
  } from "../services/paymentService";

function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [address, setAddress] = useState({
        full_name: "",
        phone: "",
        address_line: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

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

    const handleAddressChange = (e) => {

        setAddress({

            ...address,

            [e.target.name]: e.target.value

        });

    };

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const handleOrder = async () => {

        try {

            const res = await placeOrder({

                address,

                payment_method: paymentMethod

            });

            alert(res.data.message);

            navigate("/myorders");

        }

        catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Unable To Place Order");

        }

    };

    const handleOnlinePayment = async () => {

        try {
      
          const response = await createOrder(totalAmount);
      
          const order = response.order;
          console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);
          
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Banke Bihari Jewellers",
            description: "Jewellery Purchase",
            order_id: order.id,
          
            prefill: {
              name: address.full_name,
              email: "",
              contact: address.phone,
            },
          
            theme: {
              color: "#D4AF37",
            },
          
            config: {
              display: {
                blocks: {
                  upi: {
                    name: "Pay using UPI",
                    instruments: [
                      {
                        method: "upi",
                      },
                    ],
                  },
                },
                sequence: ["block.upi", "block.card", "block.netbanking"],
                preferences: {
                  show_default_blocks: true,
                },
              },
            },
          
            handler: async function (payment) {

                try {
            
                    await verifyPayment({
            
                        razorpay_order_id:
                            payment.razorpay_order_id,
            
                        razorpay_payment_id:
                            payment.razorpay_payment_id,
            
                        razorpay_signature:
                            payment.razorpay_signature
            
                    });
            
                    const res = await placeOrder({
            
                        address,
            
                        payment_method: "Online"
            
                    });
            
                    alert("Payment Successful!");
            
                    alert(res.data.message);
            
                    navigate("/myorders");
            
                }
            
                catch (err) {
            
                    console.log(err);
            
                    alert("Payment Verification Failed");
            
                }
            
            },
          };
          const razorpay = new window.Razorpay(options);
      
          razorpay.open();
      
        }
      
        catch (err) {
      
          console.log(err);
      
          alert("Unable to start payment");
      
        }
      
      };

    return (

        <div className="container mt-4">

            <h2>Checkout</h2>

            <div className="card p-4">

                <h4>Your Order</h4>

                <hr />

                {

                    cart.map(item => (

                        <div

                            key={item.cart_id}

                            className="card p-3 mb-3"

                        >

                            <h5>{item.product_name}</h5>

                            <p>

                                ₹ {item.price}

                            </p>

                            <p>

                                Quantity : {item.quantity}

                            </p>

                            <p>

                                Subtotal :

                                ₹ {item.price * item.quantity}

                            </p>

                        </div>

                    ))

                }

<h3>
    Total : ₹ {totalAmount}
</h3>

                <hr />

                <h4>Delivery Address</h4>

                <input

                    className="form-control mb-3"

                    name="full_name"

                    placeholder="Full Name"

                    value={address.full_name}

                    onChange={handleAddressChange}

                    required

                />

                <input

                    className="form-control mb-3"

                    name="phone"

                    placeholder="Phone Number"

                    value={address.phone}

                    onChange={handleAddressChange}

                    required

                />

                <textarea

                    className="form-control mb-3"

                    name="address_line"

                    placeholder="Address"

                    rows="3"

                    value={address.address_line}

                    onChange={handleAddressChange}

                    required

                />

                <input

                    className="form-control mb-3"

                    name="city"

                    placeholder="City"

                    value={address.city}

                    onChange={handleAddressChange}

                    required

                />

                <input

                    className="form-control mb-3"

                    name="state"

                    placeholder="State"

                    value={address.state}

                    onChange={handleAddressChange}

                    required

                />

                <input

                    className="form-control mb-3"

                    name="pincode"

                    placeholder="Pincode"

                    value={address.pincode}

                    onChange={handleAddressChange}

                    required

                />

                <h5>Payment Method</h5>

                <select

                    className="form-control mb-3"

                    value={paymentMethod}

                    onChange={(e) =>

                        setPaymentMethod(e.target.value)

                    }

                >

                    <option value="COD">

                        Cash On Delivery

                    </option>

                    <option value="Online">

                        Online Payment

                    </option>

                </select>

                {
    paymentMethod === "Online" ? (

        <button
            className="btn btn-success"
            onClick={handleOnlinePayment}
        >
            Pay Online
        </button>

    ) : (

        <button
            className="btn btn-primary"
            onClick={handleOrder}
        >
            Place Order
        </button>

    )
}
            </div>

        </div>

    );

}

export default Checkout;