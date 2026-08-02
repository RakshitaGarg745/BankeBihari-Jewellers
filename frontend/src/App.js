import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import OwnerBookings from "./pages/OwnerBookings";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/AdminLayout";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import Products from "./admin/pages/Products";
import AddProduct from "./admin/pages/AddProduct";
import Customers from "./admin/pages/Customers";
import Orders from "./admin/pages/Orders";
import AddOrder from "./admin/pages/AddOrder";

import Bookings from "./admin/pages/Bookings";
import AddBooking from "./admin/pages/AddBooking";
import Suppliers from "./admin/pages/Suppliers";
import AddSupplier from "./admin/pages/AddSupplier";
import EditSupplier from "./admin/pages/EditSupplier";
// const EditSupplier = () => <h2>Edit Supplier Works</h2>;
import Purchases from "./admin/pages/Purchases";
import AddPurchase from "./admin/pages/AddPurchase";
import PurchaseDetails from "./admin/pages/PurchaseDetails";
import Inventory from "./admin/pages/Inventory";
import Reports from "./admin/pages/Reports";
import Sales from "./admin/pages/Sales";
import AddSale from "./admin/pages/AddSale";
import SaleDetails from "./admin/pages/SaleDetails";
import Collections from "./pages/Collections";
function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Collections />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
<Route path="/wishlist" element={<Wishlist />} />

<Route
    path="/category/:category"
    element={<CategoryProducts />}
/>

<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/address" element={<Address />} />
<Route path="/checkout" element={<Checkout />} />

<Route path="/myorders" element={<MyOrders />} />
<Route
path="/order-success"
element={<OrderSuccess/>}
/>
<Route

path="/order/:id"

element={<OrderDetails/>}


/>
<Route path="/booking" element={<BookingPage />} />
<Route
    path="/my-bookings"
    element={<MyBookings />}
/>
<Route
    path="/owner-bookings"
    element={<OwnerBookings />}
/>
<Route path="/admin/login" element={<AdminLogin />} />

<Route
    path="/admin"
    element={
        <ProtectedAdminRoute>
            <AdminLayout />
        </ProtectedAdminRoute>
    }
>
<Route path="dashboard" element={<Dashboard />} />

<Route
    path="products"
    element={<Products />}
/>

<Route
    path="products/add"
    element={<AddProduct />}
/>
<Route
    path="customers"
    element={<Customers />}
/>
<Route
    path="orders"
    element={<Orders />}
/>
<Route
    path="add-order"
    element={<AddOrder />}
/>

<Route
    path="bookings"
    element={<Bookings />}
/>

<Route
    path="add-booking"
    element={<AddBooking />}
/>
<Route
    path="suppliers"
    element={<Suppliers />}
/>

<Route
    path="add-supplier"
    element={<AddSupplier />}
/>
 <Route
    path="edit-supplier/:id"
    element={<EditSupplier />}
/>
<Route
    path="purchases"
    element={<Purchases />}
/>

<Route
    path="add-purchase"
    element={<AddPurchase />}
/>
<Route
    path="purchase/:id"
    element={<PurchaseDetails />}
/>
<Route
    path="inventory"
    element={<Inventory />}
/>
<Route

path="reports"

element={<Reports />}

/>
<Route path="/admin/sales" element={<Sales />} />
<Route path="/admin/add-sale" element={<AddSale />} />
<Route
    path="/admin/sale/:id"
    element={<SaleDetails />}
/>

</Route>


            </Routes>

        </BrowserRouter>

    );

}

export default App;

