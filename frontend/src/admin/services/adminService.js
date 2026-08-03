import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/admin`;

export const adminLogin = async (data) => {
    return axios.post(`${API}/login`, data);
};