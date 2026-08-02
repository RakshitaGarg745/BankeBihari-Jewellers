import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/booking`;

const getToken = () => localStorage.getItem("token");

export const createBooking = async (bookingData) => {
    const response = await axios.post(
        `${API}/create`,
        bookingData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const getMyBookings = async () => {
    const response = await axios.get(
        `${API}/my-bookings`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await axios.put(
        `${API}/cancel/${bookingId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const payAdvance = async (paymentData) => {
    const response = await axios.post(
        `${API}/pay-advance`,
        paymentData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};