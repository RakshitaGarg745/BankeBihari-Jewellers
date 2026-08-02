import axios from "axios";

const API = "http://localhost:3001/admin";

export const adminLogin = async (data) => {
    return axios.post(`${API}/login`, data);
};

export const getToken = () => {
    return localStorage.getItem("adminToken");
};

export const logout = () => {
    localStorage.removeItem("adminToken");
};