import axios from "axios";

const API = "http://localhost:3001/booking";

export const getAllBookings = async () => {

    const response = await axios.get(`${API}/all`);

    return response.data;
};

export const updateBooking = async (
    bookingId,
    booking_status,
    owner_remark
) => {

    const response = await axios.put(
        `${API}/update/${bookingId}`,
        {
            booking_status,
            owner_remark
        }
    );

    return response.data;
};