import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (

        <div className="col-md-4 mb-4">

            <div className="card shadow h-100">

                <img
                    src={`${process.env.REACT_APP_API_URL}/${product.image}`}
                    className="card-img-top"
                    alt={product.product_name}
                    height="250"
                    style={{ objectFit: "cover" }}
                />

                <div className="card-body">

                    <h5>{product.product_name}</h5>

                    <p>

                        <strong>Metal:</strong> {product.metal}

                    </p>

                    <p>

                        <strong>Purity:</strong> {product.purity}

                    </p>

                    <p>

                        <strong>Weight:</strong> {product.weight} gm

                    </p>

                    <h5 className="text-success">

                        ₹{product.price}

                    </h5>

                    <Link
                        className="btn btn-primary w-100"
                        to={`/product/${product.product_id}`}
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;