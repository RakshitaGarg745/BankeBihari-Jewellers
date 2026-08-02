import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (

        <div
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#5B0E2D",
                color: "white"
            }}
        >

            <h3
                className="text-center py-4"
                style={{
                    color: "#D4AF37"
                }}
            >
                BankeBihari
            </h3>

            <Link
                to="/admin/dashboard"
                className={`d-block p-3 text-decoration-none ${
                    isActive("/admin/dashboard") ? "bg-dark" : ""
                }`}
                style={{ color: "white" }}
            >
                🏠 Dashboard
            </Link>

            <Link
className={`d-block p-3 text-decoration-none ${
location.pathname==="/admin/products"?"bg-dark":""
}`}
style={{color:"white"}}
to="/admin/products"
>
💍 Products
</Link>

<Link
    to="/admin/customers"
    className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
>
    👥 Customers
</Link>

            <Link
    to="/admin/orders"
    className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
>
    📦 Orders
</Link>

            <Link
                to="/admin/bookings"
                className="d-block p-3 text-decoration-none"
                style={{ color: "white" }}
            >
                📅 Bookings
            </Link>

            <Link
                to="/admin/suppliers"
                className="d-block p-3 text-decoration-none"
                style={{ color: "white" }}
            >
                🚚 Suppliers
            </Link>
            <li className="nav-item mb-4">

<Link
    to="/admin/purchases"
    className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
>
    📥 Purchases
</Link>

</li>

<li className="nav-item mb-4">

<Link
    to="/admin/inventory"
    className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
>
    📦 Inventory
</Link>

</li>

<li className="nav-item mb-4">

<Link
    to="/admin/reports"
    className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
>
    📊 Reports
</Link>
<li className="nav-item mb-3">

    <Link
        to="/admin/sales"
        className="d-block p-3 text-decoration-none"
    style={{ color: "white" }}
    >
        💰 Sales
    </Link>

</li>

</li>

        </div>

    );

}

export default Sidebar;