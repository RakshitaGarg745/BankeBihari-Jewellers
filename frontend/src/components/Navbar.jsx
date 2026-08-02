import { Link, useNavigate } from "react-router-dom";
import { FaRing } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "../styles/navbar.css";
function Navbar() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                background: "#5B0E2D",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}
        >

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3"
                    to="/"
                    style={{
                        color: "#D4AF37"
                    }}
                >

                    💍 BankeBihari Jewellers

                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menu"
                >

<ul className="navbar-nav ms-auto align-items-center gap-2">

<li className="nav-item">
    <Link className="nav-link text-white" to="/">
        Home
    </Link>
</li>

<li className="nav-item">
    <Link className="nav-link text-white" to="/products">
        Collections
    </Link>
</li>

{
token ?

<>

    <li className="nav-item">
        <Link className="nav-link text-white" to="/my-bookings">
            <FaRing className="me-1" />
            My Bookings
        </Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link text-white" to="/wishlist">
            <FaHeart className="me-1 text-danger" />
            Wishlist
        </Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link text-white" to="/cart">
            <FaShoppingCart className="me-1" />
            Cart
        </Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link text-white" to="/myorders">
            <FaBox className="me-1" />
            My Orders
        </Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link text-white" to="/profile">
            <FaUser className="me-1" />
            Profile
        </Link>
    </li>

    <li className="nav-item ms-2">
        <button
            className="btn btn-warning fw-semibold"
            onClick={logout}
        >
            Logout
        </button>
    </li>

</>

:
    <>
      <li className="nav-item">

      <Link to="/admin/login">
Owner
</Link>

</li>

        <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
                Login
            </Link>
        </li>

        <li className="nav-item ms-2">
            <Link className="btn btn-warning" to="/register">
                Register
            </Link>
        </li>
      

    </>

}

</ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;