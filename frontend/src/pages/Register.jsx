import { useState } from "react";
import axios from "axios";
import { registerCustomer } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle Input

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Send Email OTP

    const sendOTP = async () => {

        if (!formData.email) {

            alert("Enter Email First");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            alert("Enter Valid Email");

            return;

        }

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:3001/customers/send-registration-otp",
                {
                    email: formData.email
                }
            );

            setOtpSent(true);

            alert(
                "OTP Sent Successfully!\n\nPlease check your Inbox.\nIf you don't find it, please check your Spam/Junk folder."
            );

        }
        catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable To Send OTP"
            );

        }
        finally {

            setLoading(false);

        }

    };

    // Verify OTP

    const verifyOTP = async () => {

        if (!otp) {

            alert("Enter OTP");

            return;

        }

        try {

            await axios.post(
                "http://localhost:3001/customers/verify-registration-otp",
                {
                    email: formData.email,
                    otp
                }
            );

            setEmailVerified(true);

            alert("Email Verified Successfully");

        }
        catch (err) {

            alert(
                err.response?.data?.message ||
                "Invalid OTP"
            );

        }

    };

    // Register

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!emailVerified) {

            alert("Please Verify Email First");

            return;

        }

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            await registerCustomer(formData);

            alert("Registration Successful");

            navigate("/login");

        }
        catch (err) {

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }
        

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "500px" }}>

            <div className="card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    Customer Registration
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            name="full_name"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-group mb-3">

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={sendOTP}
                            disabled={loading || emailVerified}
                        >
                            {
                                loading
                                    ? "Sending..."
                                    : emailVerified
                                        ? "Verified"
                                        : "Send OTP"
                            }
                        </button>

                    </div>

                    {

                        otpSent && (

                            <div className="input-group mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className={
                                        emailVerified
                                            ? "btn btn-success"
                                            : "btn btn-warning"
                                    }
                                    onClick={verifyOTP}
                                    disabled={emailVerified}
                                >
                                    {
                                        emailVerified
                                            ? "Verified ✓"
                                            : "Verify OTP"
                                    }
                                </button>

                            </div>

                        )

                    }

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <textarea
                            className="form-control"
                            name="address"
                            placeholder="Address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={!emailVerified}
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;