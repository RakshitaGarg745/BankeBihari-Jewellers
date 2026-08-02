import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",
    
        password: ""
    
    });

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            alert("Enter Email and Password");
        
            return;
        
        }

        try {

            setLoading(true);

            const res = await loginCustomer(formData);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(

                "customer",

                JSON.stringify(res.data.customer)

            );

            if (rememberMe) {

                localStorage.setItem(

                    "rememberEmail",
                
                    formData.email
                
                );

            }

            alert("Login Successful");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Login Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <div className="card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    Customer Login
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Username */}

                    <div className="mb-3">

                    <label className="form-label">
    Email
</label>

<input
    type="email"
    className="form-control"
    name="email"
    placeholder="Enter Registered Email"
    value={formData.email}
    onChange={handleChange}
    required
/>

                    </div>

                    {/* Password */}

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {
                                    showPassword
                                        ? "Hide"
                                        : "Show"
                                }
                            </button>

                        </div>

                    </div>

                    {/* Remember Me */}

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember"
                            checked={rememberMe}
                            onChange={() =>
                                setRememberMe(
                                    !rememberMe
                                )
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="remember"
                        >
                            Remember Me
                        </label>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>

                    {/* Forgot Password */}

                    <div className="text-center mt-3">

                        <Link
                            to="/forgot-password"
                            className="text-decoration-none"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Register */}

                    <div className="text-center mt-3">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-decoration-none ms-2"
                        >
                            Register
                        </Link>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Login;