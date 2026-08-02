import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminService";

function AdminLogin() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await adminLogin(form);

            localStorage.setItem("adminToken", res.data.token);

            alert("Login Successful");

            navigate("/admin/dashboard");

        } catch (err) {

            alert(err.response?.data?.message || "Login Failed");

        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2 className="text-center mb-4">
                Admin Login
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button className="btn btn-dark w-100">
                    Login
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;