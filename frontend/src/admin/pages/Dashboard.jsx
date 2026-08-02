import { useState, useEffect } from "react";
import axios from "axios";

import "./Dashboard.css";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
FaGem,
FaUsers,
FaShoppingCart,
FaRupeeSign,
FaBoxes,
FaCalendarAlt
} from "react-icons/fa";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
Title,
Tooltip,
Legend
);

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    purchases: 0,
    bookings: 0,
    revenue: 0
  });

  const [monthlySales,setMonthlySales]=useState([]);

const [monthlyPurchases,setMonthlyPurchases]=useState([]);

const [orderStatus,setOrderStatus]=useState([]);

const [lowStock,setLowStock]=useState([]);

useEffect(()=>{

    fetchDashboard();
    
    fetchMonthlySales();
    
    fetchMonthlyPurchases();
    
    fetchOrderStatus();
    
    fetchLowStock();
    
    },[]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`);
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMonthlySales=async()=>{

    try{
    
    const res=await axios.get(
    
    `${process.env.REACT_APP_API_URL}/dashboard-chart/monthly-sales`
    
    );
    
    setMonthlySales(res.data);
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };
    
    
    
    const fetchMonthlyPurchases=async()=>{
    
    try{
    
    const res=await axios.get(
    
    `${process.env.REACT_APP_API_URL}/dashboard-chart/monthly-purchases`
    
    );
    
    setMonthlyPurchases(res.data);
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };
    
    
    
    const fetchOrderStatus=async()=>{
    
    try{
    
    const res=await axios.get(
    
   `${process.env.REACT_APP_API_URL}/dashboard-chart/order-status`
    
    );
    
    setOrderStatus(res.data);
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };
    
    
    
    const fetchLowStock=async()=>{
    
    try{
    
    const res=await axios.get(
    
    `${process.env.REACT_APP_API_URL}/dashboard-chart/low-stock`
    
    );
    
    setLowStock(res.data);
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };

    const salesChart={

        labels:monthlySales.map(item=>item.month),
        
        datasets:[
        
        {
        
        label:"Monthly Sales",
        
        data:monthlySales.map(item=>item.total),
        
        backgroundColor:"#D4AF37",
        
        borderRadius:8
        
        }
        
        ]
        
        };
        
        
        
        const purchaseChart={
        
        labels:monthlyPurchases.map(item=>item.month),
        
        datasets:[
        
        {
        
        label:"Monthly Purchases",
        
        data:monthlyPurchases.map(item=>item.total),
        
        borderColor:"#8B0000",
        
        backgroundColor:"#8B0000",
        
        tension:0.4,
        
        fill:false
        
        }
        
        ]
        
        };
        
        
        
        const orderChart={
        
        labels:orderStatus.map(item=>item.order_status),
        
        datasets:[
        
        {
        
        data:orderStatus.map(item=>item.total),
        
        backgroundColor:[
        
        "#D4AF37",
        
        "#8B0000",
        
        "#198754",
        
        "#0d6efd"
        
        ]
        
        }
        
        ]
        
        };
        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
        };
        
        const pieOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        };

        return (
          <div className="dashboard-container">
        
            {/* Header */}
            <div className="dashboard-header">
              <h1>💎 BANKE BIHARI JEWELLERS</h1>
              <p>Jewellery Management System</p>
            </div>
        
            {/* Welcome */}
            <div className="welcome-card">
              <div>
                <h2>Welcome Admin 👋</h2>
                <p>
                  Manage your jewellery showroom with complete control over
                  products, customers, orders, purchases and bookings.
                </p>
              </div>
            </div>
        
            {/* KPI Cards */}
            <div className="cards-grid">
        
              <div className="dashboard-card gold">
                <FaGem className="card-icon" />
                <h4>Total Products</h4>
                <h2>{dashboard.products}</h2>
              </div>
        
              <div className="dashboard-card maroon">
                <FaUsers className="card-icon" />
                <h4>Total Customers</h4>
                <h2>{dashboard.customers}</h2>
              </div>
        
              <div className="dashboard-card blue">
                <FaShoppingCart className="card-icon" />
                <h4>Total Orders</h4>
                <h2>{dashboard.orders}</h2>
              </div>
        
              <div className="dashboard-card green">
                <FaRupeeSign className="card-icon" />
                <h4>Total Revenue</h4>
                <h2>₹ {dashboard.revenue}</h2>
              </div>
        
              <div className="dashboard-card purple">
                <FaBoxes className="card-icon" />
                <h4>Total Purchases</h4>
                <h2>{dashboard.purchases}</h2>
              </div>
        
              <div className="dashboard-card orange">
                <FaCalendarAlt className="card-icon" />
                <h4>Total Bookings</h4>
                <h2>{dashboard.bookings}</h2>
              </div>
        
            </div>
        
            {/* Charts */}
            <div className="section-title">
              <h2>📊 Business Analytics</h2>
              <p>Live Jewellery Store Analytics</p>
            </div>
        
            <div className="chart-grid">
        
              <div className="chart-card">
                <h3>💰 Monthly Sales</h3>
                <div className="chart-container">
    <Bar data={salesChart} options={chartOptions}/>
</div>
              </div>
        
              <div className="chart-card">
                <h3>📦 Monthly Purchases</h3>
                <div className="chart-container">
    <Line data={purchaseChart} options={chartOptions}/>
</div>
              </div>
        
            </div>
        
            <div className="chart-grid">
        
              <div className="chart-card">
                <h3>🛒 Order Status</h3>
                <div className="chart-container">
    <Bar data={orderChart} options={pieOptions}/>
</div>
              </div>
        
              <div className="chart-card">
                <h3>⚠ Low Stock Jewellery</h3>
        
                <table className="low-stock-table">
        
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
        
                  <tbody>
        
                    {lowStock.length === 0 ? (
                      <tr>
                        <td colSpan="2">No Low Stock Products</td>
                      </tr>
                    ) : (
                      lowStock.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product_name}</td>
                          <td>{item.stock}</td>
                        </tr>
                      ))
                    )}
        
                  </tbody>
        
                </table>
        
              </div>
        
            </div>
        
          </div>
        );
        
        }
        
        export default Dashboard;



// import axios from "axios";

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     ArcElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend
// } from "chart.js";


// import { Bar, Pie, Line } from "react-chartjs-2";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     ArcElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend
// );


// function Dashboard() {

//     const [sales, setSales] = useState([]);
//     const [purchases, setPurchases] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [stock, setStock] = useState([]);
//     const [dashboard, setDashboard] = useState({

//         products:0,
    
//         customers:0,
    
//         orders:0,
    
//         revenue:0,
    
//         recentSales:[],
    
//         recentOrders:[],
    
//         recentBookings:[]
    
//     });
//     useEffect(() => {

//         loadDashboard();

//     }, []);

//     const loadDashboard = async () => {

//         try {

//             const saleRes = await axios.get(
//                 "http://localhost:3001/dashboard-chart/monthly-sales"
//             );

//             const purchaseRes = await axios.get(
//                 "http://localhost:3001/dashboard-chart/monthly-purchases"
//             );

//             const orderRes = await axios.get(
//                 "http://localhost:3001/dashboard-chart/order-status"
//             );

//             const stockRes = await axios.get(
//                 "http://localhost:3001/dashboard-chart/low-stock"
//             );

//             const dashboardRes = await axios.get(
//                 "http://localhost:3001/dashboard"
//             );
//             setSales(saleRes.data);
//             setPurchases(purchaseRes.data);
//             setOrders(orderRes.data);
//             setStock(stockRes.data);
//             setDashboard(dashboardRes.data);

//         }

//         catch(err){

//             console.log(err);

//         }

//     };

//     const salesData = {

//         labels: sales.map(item=>item.month),

//         datasets: [
//             {
//                 label: "Monthly Sales",
//                 data: sales.map(item => item.total),
        
//                 backgroundColor: [
//                     "#0d6efd",
//                     "#198754",
//                     "#ffc107",
//                     "#dc3545",
//                     "#6f42c1",
//                     "#20c997",
//                     "#fd7e14",
//                     "#6610f2",
//                     "#0dcaf0",
//                     "#d63384",
//                     "#198754",
//                     "#0d6efd"
//                 ],
        
//                 borderColor: "#0d6efd",
        
//                 borderWidth: 2
        
//             }
//         ]

//     };

//     const purchaseData = {

//         labels:purchases.map(item=>item.month),

//         datasets:[
//             {
//             label:"Monthly Purchases",
            
//             data:purchases.map(item=>item.total),
            
//             borderColor:"#198754",
            
//             backgroundColor:"rgba(25,135,84,0.3)",
            
//             fill:true,
            
//             tension:0.4,
            
//             pointBackgroundColor:"#198754",
            
//             pointRadius:6
            
//             }
//             ]

//     };

//     const orderData={

//         labels:orders.map(item=>item.order_status),

//         datasets:[
//             {
            
//             data:orders.map(item=>item.total),
            
//             backgroundColor:[
            
//             "#0d6efd",
            
//             "#ffc107",
            
//             "#198754",
            
//             "#dc3545",
            
//             "#6f42c1"
            
//             ],
            
//             borderColor:"#ffffff",
            
//             borderWidth:2
            
//             }
//             ]

//     };

//     return(

//         <div className="container-fluid">

//             <h2 className="mb-4">

//                 Dashboard Analytics

//             </h2>

//             <div className="row">

//                 <div className="col-md-6">

//                     <div className="card p-3">

//                         <h4>

//                             Monthly Sales

//                         </h4>

//                         <Bar data={salesData}/>

//                     </div>

//                 </div>

//                 <div className="col-md-6">

//                     <div className="card p-3">

//                         <h4>

//                             Monthly Purchases

//                         </h4>

//                         <Line data={purchaseData}/>

//                     </div>

//                 </div>

//             </div>

//             <div className="row mt-4">

//                 <div className="col-md-6">

//                     <div className="card p-3">

//                         <h4>

//                             Order Status

//                         </h4>

//                         <Pie data={orderData}/>

//                     </div>

//                 </div>

//                 <div className="col-md-6">

//                     <div className="card p-3">

//                         <h4>

//                             Low Stock Products

//                         </h4>
//                         <div className="row mt-4">

//     <div className="col-md-3">

//     <div
//     className="card shadow-lg border-0 rounded-4"
//     style={{
//         background: "linear-gradient(135deg,#0d6efd,#4dabf7)",
//         color: "white"
//     }}
// >

//             <div className="card-body">

//                 <h5>Products</h5>

//                 <h2>{dashboard.products}</h2>

//             </div>

//         </div>

//     </div>

//     <div className="col-md-3">

//     <div
//     className="card shadow-lg border-0 rounded-4"
//     style={{
//         background: "linear-gradient(135deg,#198754,#20c997)",
//         color: "white"
//     }}
// >

//             <div className="card-body">

//                 <h5>Customers</h5>

//                 <h2>{dashboard.customers}</h2>

//             </div>

//         </div>

//     </div>

//     <div className="col-md-3">

//     <div
//     className="card shadow-lg border-0 rounded-4"
//     style={{
//         background: "linear-gradient(135deg,#ffc107,#fd7e14)",
//         color: "black"
//     }}
// >

//             <div className="card-body">

//                 <h5>Orders</h5>

//                 <h2>{dashboard.orders}</h2>

//             </div>

//         </div>

//     </div>

//     <div className="col-md-3">

//     <div
//     className="card shadow-lg border-0 rounded-4"
//     style={{
//         background: "linear-gradient(135deg,#dc3545,#ff6b6b)",
//         color: "white"
//     }}
// >

//             <div className="card-body">

//                 <h5>Revenue</h5>

//                 <h2>

//                     ₹ {dashboard.revenue}

//                 </h2>

//             </div>

//         </div>

//     </div>

// </div>

// <div className="card mt-4">

//     <div className="card-header">

//         <h4>Recent Sales</h4>

//     </div>

//     <table className="table">

//         <thead>

//             <tr>

//                 <th>ID</th>

//                 <th>Customer</th>

//                 <th>Total</th>

//                 <th>Date</th>

//             </tr>

//         </thead>

//         <tbody>

//             {

//                 dashboard.recentSales.map(sale=>(

//                     <tr key={sale.sale_id}>

//                         <td>{sale.sale_id}</td>

//                         <td>{sale.full_name}</td>

//                         <td>₹ {sale.total_amount}</td>

//                         <td>{sale.sale_date}</td>

//                     </tr>

//                 ))

//             }

//         </tbody>

//     </table>

// </div>
// <div className="card mt-4">

//     <div className="card-header">

//         <h4>Recent Orders</h4>

//     </div>

//     <table className="table">

//         <thead>

//             <tr>

//                 <th>ID</th>

//                 <th>Status</th>

//                 <th>Total</th>

//             </tr>

//         </thead>

//         <tbody>

//             {

//                 dashboard.recentOrders.map(order=>(

//                     <tr key={order.order_id}>

//                         <td>{order.order_id}</td>

//                         <td>{order.order_status}</td>

//                         <td>₹ {order.total_amount}</td>

//                     </tr>

//                 ))

//             }

//         </tbody>

//     </table>

// </div>
// <div className="card mt-4">

//     <div className="card-header">

//         <h4>Recent Bookings</h4>

//     </div>

//     <table className="table">

//         <thead>

//             <tr>

//                 <th>ID</th>

//                 <th>Status</th>

//                 <th>Date</th>

//             </tr>

//         </thead>

//         <tbody>

//             {

//                 dashboard.recentBookings.map(booking=>(

//                     <tr key={booking.booking_id}>

//                         <td>{booking.booking_id}</td>

//                         <td>{booking.booking_status}</td>

//                         <td>{booking.booking_date}</td>

//                     </tr>

//                 ))

//             }

//         </tbody>

//     </table>

// </div>


//                         <table className="table">

//                             <thead>

//                                 <tr>

//                                     <th>Product</th>

//                                     <th>Stock</th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {

//                                     stock.map(product=>(

//                                         <tr key={product.product_name}>

//                                             <td>

//                                                 {product.product_name}

//                                             </td>

//                                             <td>

//                                                 {product.stock}

//                                             </td>

//                                         </tr>

//                                     ))

//                                 }

//                             </tbody>

//                         </table>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

    

// }

// export default Dashboard;