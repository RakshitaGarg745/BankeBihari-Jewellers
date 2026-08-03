import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/wishlist`;

export const addToWishlist = async (productId) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API}/add`,
        {
            product_id: productId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};

export const getWishlist = async () => {

    const token = localStorage.getItem("token");

    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const removeFromWishlist = async (wishlistId) => {

    const token = localStorage.getItem("token");

    return axios.delete(`${API}/${wishlistId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};