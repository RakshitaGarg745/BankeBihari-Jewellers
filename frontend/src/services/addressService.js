import axios from "axios";

const API = "http://localhost:3001/address";

const getToken = () => localStorage.getItem("token");

export const addAddress = (data) => {
    return axios.post(`${API}/add`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const getAddresses = () => {
    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};