function Dashboard() {

    return (

        <div>

            <h2 className="mb-4">

                Welcome Owner 👋

            </h2>

            <div className="row">

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h6>Total Products</h6>

                        <h2>0</h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h6>Total Customers</h6>

                        <h2>0</h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h6>Pending Orders</h6>

                        <h2>0</h2>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h6>Pending Bookings</h6>

                        <h2>0</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;