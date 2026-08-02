import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/customers`;

export const registerCustomer = async (customerData) => {
    return axios.post(`${API}/register`, customerData);
};

export const loginCustomer = async (data) => {
    return axios.post(`${API}/login`, data);
};

export const getProfile = async (token) => {
    return axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};