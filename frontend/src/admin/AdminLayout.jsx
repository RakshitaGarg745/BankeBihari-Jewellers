import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function AdminLayout() {

    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container-fluid mt-4">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;