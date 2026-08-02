import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("adminToken");

        navigate("/admin/login");

    };

    return (

        <nav
            className="navbar navbar-light bg-white shadow-sm px-4"
        >

            <h4 className="mb-0">

                Admin Dashboard

            </h4>

            <button
                className="btn btn-danger"
                onClick={logout}
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;