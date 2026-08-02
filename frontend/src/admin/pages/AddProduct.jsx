import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: "",
        category: "",
        metal: "",
        purity: "",
        weight: "",
        making_charges: "",
        price: "",
        stock: "",
        description: ""
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });

        formData.append("image", image);

        try {

            await axios.post(
                `${process.env.REACT_APP_API_URL}/products`,
                formData
            );

            alert("Product Added Successfully");

            navigate("/admin/products");

        } catch (err) {

            console.log(err);

            alert("Unable to Add Product");

        }

    };

    return (

        <div className="container">

            <h2 className="mb-4">Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Product Name"
                    name="product_name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Category"
                    name="category"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Metal"
                    name="metal"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Purity"
                    name="purity"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Weight"
                    name="weight"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Making Charges"
                    name="making_charges"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Stock"
                    name="stock"
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="btn btn-success">
                    Add Product
                </button>

            </form>

        </div>

    );

}

export default AddProduct;