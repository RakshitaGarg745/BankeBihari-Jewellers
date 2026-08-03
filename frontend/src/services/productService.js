import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/products`;

export const getProducts = () => axios.get(API);

export const getProduct = (id) => axios.get(`${API}/${id}`);

export const getProductsByCategory = async (category) => {
    const response = await axios.get(`${API}/category/${category}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};