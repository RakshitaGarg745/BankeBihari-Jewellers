import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: "",
        category: "Ring",
        metal: "Gold",
        purity: "22K",
        weight: "",
        making_charges: "",
        price: "",
        stock: "",
        description: "",
        image: null
    });
    
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };
    const handleImageChange = (e) => {

        const file = e.target.files[0];
    
        setProduct({
            ...product,
            image: file
        });
    
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    
    };

    const saveProduct = () => {

        const formData = new FormData();
    
        formData.append("product_name", product.product_name);
        formData.append("category", product.category);
        formData.append("metal", product.metal);
        formData.append("purity", product.purity);
        formData.append("weight", product.weight);
        formData.append("making_charges", product.making_charges);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("description", product.description);
    
        if (product.image) {
            formData.append("image", product.image);
        }
    
        axios.post(
            "http://localhost:3001/products",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then((res) => {
    
            alert(res.data.message);
    
            navigate("/products");
    
        })
        .catch((err) => {
    
            console.log(err);
    
            alert("Failed to Add Product");
    
        });
    
    };
    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h3>Add New Product</h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Product Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="product_name"
                                value={product.product_name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Category</label>

                            <select
                                className="form-control"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            >

                                <option>Ring</option>
                                <option>Chain</option>
                                <option>Necklace</option>
                                <option>Bangle</option>
                                <option>Earrings</option>
                                <option>Pendant</option>
                                <option>Bracelet</option>
                                <option>Mangalsutra</option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Metal</label>

                            <select
                                className="form-control"
                                name="metal"
                                value={product.metal}
                                onChange={handleChange}
                            >

                                <option>Gold</option>
                                <option>Silver</option>
                                <option>Diamond</option>
                                <option>Platinum</option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Purity</label>

                            <select
                                className="form-control"
                                name="purity"
                                value={product.purity}
                                onChange={handleChange}
                            >

                                <option>18K</option>
                                <option>22K</option>
                                <option>24K</option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Weight (grams)</label>

                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="weight"
                                value={product.weight}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Making Charges</label>

                            <input
                                type="number"
                                className="form-control"
                                name="making_charges"
                                value={product.making_charges}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Price</label>

                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">Stock</label>

                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="col-md-12 mb-3">

    <label className="form-label">
        Product Image
    </label>

    <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleImageChange}
    />

</div>
{
    preview && (

        <div className="mb-3">

            <img
                src={preview}
                alt="Preview"
                width="200"
                className="img-thumbnail"
            />

        </div>

    )
}

                        <div className="col-md-12 mb-3">

                            <label className="form-label">Description</label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        <div className="col-md-12 text-center">

                            <button
                                className="btn btn-success"
                                onClick={saveProduct}
                            >
                                Save Product
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddProduct;