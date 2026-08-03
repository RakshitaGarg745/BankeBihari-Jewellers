const Order = require("../models/orderModel");
const Address = require("../models/addressModel");

// ================= PLACE ORDER =================

exports.placeOrder = async (req, res) => {
    const { address, payment_method } = req.body;
    const customerId = req.customer.id;
    let addressId;
    console.log("====== PLACE ORDER API CALLED ======");

    try {
    
        addressId = await Address.addAddress({
    
            customer_id: customerId,
    
            full_name: address.full_name,
    
            phone: address.phone,
    
            address_line: address.address_line,
    
            city: address.city,
    
            state: address.state,
    
            pincode: address.pincode,
    
            address_type: "Home"
    
        });
    
    } catch (err) {
    
        console.log(err);
    
        return res.status(500).json({
    
            success: false,
    
            message: "Unable to save address"
    
        });
    
    }

    Order.getCartItems(customerId, (err, cartItems) => {

        if (err)
            return res.status(500).json({ success: false, message: "Database Error" });

        if (cartItems.length === 0)
            return res.status(400).json({ success: false, message: "Cart is Empty" });

        let total = 0;

        for (let item of cartItems) {

            if (item.quantity > item.stock) {
                return res.status(400).json({
                    success: false,
                    message: `${item.product_name} Out Of Stock`
                });
            }

            total += item.price * item.quantity;
        }

        const paymentStatus =
        payment_method === "Online"
            ? "Paid"
            : "Pending";
    
    Order.createOrder(
    
        customerId,
    
        addressId,
    
        total,
    
        payment_method,
    
        paymentStatus,
    
        (err, result) => {

                if (err)
                    return res.status(500).json({
                        success: false,
                        message: "Unable To Create Order"
                    });

                const orderId = result.insertId;

                let completed = 0;

                cartItems.forEach(item => {

                    Order.addOrderItem(
                        orderId,
                        item.product_id,
                        item.quantity,
                        item.price,

                        (err) => {

                            if (err) return console.log(err);

                            Order.reduceStock(
                                item.product_id,
                                item.quantity,

                                (err) => {

                                    if (err) return console.log(err);

                                    completed++;

                                    if (completed === cartItems.length) {

                                        Order.clearCart(customerId, (err) => {

                                            if (err)
                                                return res.status(500).json({
                                                    success: false,
                                                    message: "Cart Clear Failed"
                                                });

                                            res.json({
                                                success: true,
                                                message: "Order Placed Successfully"
                                            });

                                        });

                                    }

                                }

                            );

                        }

                    );

                });

            }

        );

    });

};


// ================= CUSTOMER ORDERS =================

exports.getMyOrders = (req, res) => {

    Order.getMyOrders(req.customer.id, (err, orders) => {

        if (err)
            return res.status(500).json({
                success: false,
                message: "Unable To Fetch Orders"
            });

        res.json({
            success: true,
            orders
        });

    });

};


// ================= CUSTOMER ORDER DETAILS =================

exports.getOrderDetails = (req, res) => {

    Order.getOrderDetails(req.params.id, (err, items) => {

        if (err)
            return res.status(500).json({
                success: false,
                message: "Unable To Fetch Order Details"
            });

        res.json({
            success: true,
            items
        });

    });

};


// ================= ADMIN - ALL ORDERS =================

exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.getAllOrders();

        res.json(orders);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ================= ADMIN ADD ORDER =================

// ================= ADMIN ADD ORDER =================

exports.adminAddOrder = async (req, res) => {

    try {

        const {
            customer_id,
            payment_method,
            address,
            items
        } = req.body;

        // Save Address First
        const addressId = await Address.addAddress({

            customer_id,

            full_name: address.full_name,
            phone: address.phone,
            address_line: address.address_line,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            address_type: "Home"

        });

        // Create Order
        const orderId = await Order.adminAddOrder(

            customer_id,
            addressId,
            payment_method,
            items

        );

        res.json({

            success: true,
            message: "Order Added Successfully",
            orderId

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ================= ADMIN - SINGLE ORDER =================

exports.getSingleOrder = async (req, res) => {

    try {

        console.log("Fetching order:", req.params.id);

        const order = await Order.getSingleOrder(req.params.id);

        console.log(order);

        res.json(order);

    } catch (err) {

        console.log("GET SINGLE ORDER ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ================= UPDATE STATUS =================

exports.updateStatus = async (req, res) => {

    try {

        await Order.updateStatus(
            req.params.id,
            req.body.order_status
        );

        res.json({
            success: true,
            message: "Order Status Updated"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ================= DELETE ORDER =================

exports.deleteOrder = async (req, res) => {

    try {

        await Order.deleteOrder(req.params.id);

        res.json({
            success: true,
            message: "Order Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updatePaymentStatus = async (req, res) => {

    try {

        await Order.updatePaymentStatus(
            req.params.id,
            req.body.payment_status
        );

        res.json({
            success: true,
            message: "Payment Status Updated"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};