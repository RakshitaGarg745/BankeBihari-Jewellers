import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/payment`;

export const createOrder = async (amount) => {
    const res = await axios.post(`${API}/create-order`, {
        amount,
    });

    return res.data;
};

export const verifyPayment = async (paymentData) => {
    const res = await axios.post(`${API}/verify`, paymentData);

    return res.data;
};