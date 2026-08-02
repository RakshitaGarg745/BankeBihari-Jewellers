import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/cart`;

const getToken = () => localStorage.getItem("token");



export const addToCart = async (product_id) => {

    console.log("Sending Product ID:", product_id);

    const token = localStorage.getItem("token");

    console.log("Token:", token);

    const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/cart`,
        data: {
            product_id: product_id
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response;
};

export const getCart = async () => {

    return await axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

};

export const increaseQuantity = async (cartId) => {

    return await axios.put(
        `${API}/increase/${cartId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};

export const decreaseQuantity = async (cartId) => {

    return await axios.put(
        `${API}/decrease/${cartId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};

export const removeItem = async (cartId) => {

    return await axios.delete(`${API}/${cartId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

};