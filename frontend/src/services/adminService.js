import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/cart`;

export const adminLogin = async (data) => {
    return axios.post(`${API}/login`, data);
};

export const getToken = () => {
    return localStorage.getItem("adminToken");
};

export const logout = () => {
    localStorage.removeItem("adminToken");
};