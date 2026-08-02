import axios from "axios";

const API = "http://localhost:3001/orders";

export const createAdminOrder = (data) => {

    return axios.post(

        `${API}/admin/add`,

        data

    );

};