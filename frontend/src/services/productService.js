import axios from "axios";

const API = "http://localhost:3001/products";

export const getProducts = () => axios.get(API);

export const getProduct = (id) => axios.get(`${API}/${id}`);

export const getProductsByCategory = async (category) => {

    const response = await axios.get(
        `http://localhost:3001/products/category/${category}`
    );

    return response.data;

};

export const getProductById = async (id) => {

    const res = await axios.get(

        `http://localhost:3001/products/${id}`

    );

    return res.data;

};