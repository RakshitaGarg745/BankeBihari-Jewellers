import { Link } from "react-router-dom";

function OrderSuccess(){

return(

<div className="container text-center mt-5">

<h1>

✅

</h1>

<h2>

Order Placed Successfully

</h2>

<p>

Thank you for shopping with BankeBihari Jewellers

</p>

<div className="mt-4">

    <Link
        to="/myorders"
        className="btn btn-success me-3"
    >
        View My Orders
    </Link>

    <Link
        to="/products"
        className="btn btn-primary"
    >
        Continue Shopping
    </Link>

</div>

</div>

);

}

export default OrderSuccess;