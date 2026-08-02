import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

function Profile() {

    const [customer, setCustomer] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await getProfile(token);

console.log(res.data);

setCustomer(res.data);

            }

            catch {

                alert("Please Login");

            }

        };

        fetchProfile();

    }, []);

    if (!customer) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="container mt-5">

            <h2>Customer Profile</h2>

            <hr />

            <h4>Name : {customer.full_name}</h4>

            <h4>Email : {customer.email}</h4>

            <h4>Phone : {customer.phone}</h4>

            <h4>Address : {customer.address}</h4>

        </div>

    );

}

export default Profile;