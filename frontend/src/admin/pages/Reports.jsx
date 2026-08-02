import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

    const [summary, setSummary] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0
    });

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3001/reports/sales"
            );

            setSummary(res.data.summary);

            setTopProducts(res.data.topProducts);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Sales Report

            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card bg-primary text-white">

                        <div className="card-body">

                            <h5>Total Orders</h5>

                            <h2>{summary.totalOrders}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-success text-white">

                        <div className="card-body">

                            <h5>Total Revenue</h5>

                            <h2>₹ {summary.totalRevenue}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-warning">

                        <div className="card-body">

                            <h5>Average Order Value</h5>

                            <h2>

                                ₹ {Number(summary.averageOrderValue).toFixed(2)}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header bg-dark text-white">

                    <h4>

                        Top Selling Products

                    </h4>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>Product</th>

                                <th>Total Sold</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                topProducts.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="2"
                                            className="text-center"
                                        >

                                            No Data Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    topProducts.map((product,index)=>(

                                        <tr key={index}>

                                            <td>

                                                {product.product_name}

                                            </td>

                                            <td>

                                                {product.totalSold}

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Reports;