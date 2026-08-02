import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
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

    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then((res) => {

                setProduct(res.data);
                setPreview(
                    `${process.env.REACT_APP_API_URL}/uploads/${res.data.image}`
                );

            })
            .catch((err) => {

                console.log(err);

            });

    }, [id]);

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


    const updateProduct = () => {

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
    
        if (product.image instanceof File) {
            formData.append("image", product.image);
        } else {
            formData.append("image", product.image);
        }
    
        axios.put(
            `${process.env.REACT_APP_API_URL}/products/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(() => {
    
            alert("✅ Product Updated Successfully");
    
            navigate("/products");
    
        })
        .catch((err) => {
    
            console.log(err);
    
            alert("Update Failed");
    
        });
    
    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h3>Edit Product</h3>

                </div>
                <div className="text-center mb-4">

    <img

        src={`http://localhost:3001/uploads/${product.image}`}

        alt={product.product_name}

        width="200"

        className="img-thumbnail"

    />

</div>
<div className="text-center mb-4">

    {
        preview &&

        <img
            src={preview}
            alt="Product"
            width="200"
            className="img-thumbnail"
        />
    }

</div>

                <div className="card-body">

                    <div className="mb-3">

                        <label>Product Name</label>

                        <input
                            className="form-control"
                            name="product_name"
                            value={product.product_name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Category</label>

                        <input
                            className="form-control"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Metal</label>

                        <input
                            className="form-control"
                            name="metal"
                            value={product.metal}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Purity</label>

                        <input
                            className="form-control"
                            name="purity"
                            value={product.purity}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Weight</label>

                        <input
                            className="form-control"
                            name="weight"
                            value={product.weight}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Making Charges</label>

                        <input
                            className="form-control"
                            name="making_charges"
                            value={product.making_charges}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Price</label>

                        <input
                            className="form-control"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Stock</label>

                        <input
                            className="form-control"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="mb-3">

    <label>Change Product Image</label>

    <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleImageChange}
    />

</div>

                    <div className="mb-3">

                        <label>Description</label>

                        <textarea
                            className="form-control"
                            rows="4"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-success"
                        onClick={updateProduct}
                    >
                        Update Product
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProduct;