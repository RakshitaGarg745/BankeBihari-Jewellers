import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/cart`;

const getToken = () => localStorage.getItem("token");

export const placeOrder = (data) => {

    return axios.post(

        `${API}/place`,

        data,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};

export const getMyOrders = () => {

    return axios.get(

        `${API}/myorders`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};

export const getOrderDetails = (id) => {

    return axios.get(

        `${API}/details/${id}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};
