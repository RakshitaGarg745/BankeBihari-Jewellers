import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "bootstrap/js/dist/modal";

function Products() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

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

    const [editingId, setEditingId] = useState(null);

const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // ==========================
    // Fetch Products
    // ==========================

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/products`
            );

            setProducts(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ==========================
    // Search
    // ==========================

    const filteredProducts = products.filter((item) =>
        item.product_name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==========================
    // Handle Form
    // ==========================

    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // Open Modal
    // ==========================

    const openModal = () => {

        const modal = new Modal(

            document.getElementById("addProductModal")

        );

        modal.show();

    };

    // ==========================
    // Add Product
    // ==========================

    const addProduct = async () => {

        try {

            const formData = new FormData();

            Object.keys(product).forEach((key) => {

                formData.append(key, product[key]);

            });

            if (image) {

                formData.append("image", image);

            }

            await axios.post(

                `${process.env.REACT_APP_API_URL}/products`,

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            alert("Product Added Successfully");

            fetchProducts();

            setProduct({
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

            setImage(null);

            const modal = Modal.getInstance(
                document.getElementById("addProductModal")
            );
            
            if (modal) {
                modal.hide();
            }

        }

        catch (err) {

            console.log(err);

            alert("Unable To Add Product");

        }

    };

    const updateProduct = async () => {

        try {
    
            const formData = new FormData();
    
            Object.keys(product).forEach(key => {
    
                formData.append(key, product[key]);
    
            });
    
            if(image){
    
                formData.append("image", image);
    
            }
    
            await axios.put(
    
                `${process.env.REACT_APP_API_URL}/products/${editingId}`,
    
                formData
    
            );
    
            alert("Product Updated");
    
            fetchProducts();
    
            const modal = Modal.getInstance(
                document.getElementById("addProductModal")
            );
    
            modal.hide();
    
        }
    
        catch(err){
    
            console.log(err);
    
        }
    
    };

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
    
        if (!confirmDelete) return;
    
        try {
    
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/products/${id}`
            );
    
            alert("Product Deleted Successfully");
    
            fetchProducts();
    
        }
    
        catch (err) {
    
            console.log(err);
    
            alert("Unable To Delete Product");
    
        }
    
    };

    const openEditModal = (item) => {

        setIsEdit(true);
    
        setEditingId(item.product_id);
    
        setProduct({
    
            product_name: item.product_name,
            category: item.category,
            metal: item.metal,
            purity: item.purity,
            weight: item.weight,
            making_charges: item.making_charges,
            price: item.price,
            stock: item.stock,
            description: item.description
    
        });
    
        const modal = new Modal(
            document.getElementById("addProductModal")
        );
    
        modal.show();
    
    };
    return (

        <div className="container-fluid">
    
            <div className="d-flex justify-content-between align-items-center mb-4">
    
                <h2>Products Management</h2>
    
                <button
                    className="btn btn-success"
                    onClick={openModal}
                >
                    + Add Product
                </button>
    
            </div>
    
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
    
            <table className="table table-bordered table-hover align-middle">
    
                <thead className="table-dark">
    
                    <tr>
    
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Metal</th>
                        <th>Purity</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th width="170">
                            Action
                        </th>
    
                    </tr>
    
                </thead>
    
                <tbody>
    
                    {
    
                        filteredProducts.length === 0 ?
    
                        (
    
                            <tr>
    
                                <td
                                    colSpan="10"
                                    className="text-center"
                                >
    
                                    No Products Found
    
                                </td>
    
                            </tr>
    
                        )
    
                        :
    
                        (
    
                            filteredProducts.map((item) => (
    
                                <tr key={item.product_id}>
    
                                    <td>{item.product_id}</td>
    
                                    <td>
    
                                        {
    
                                            item.image ?
    
                                            <img
src={
    item.image
        ? `${process.env.REACT_APP_API_URL}/uploads/${item.image}`
        : "/no-image.png"
}
                                                alt=""
    
                                                width="70"
    
                                                height="70"
    
                                                style={{
    
                                                    objectFit:"cover",
    
                                                    borderRadius:"8px"
    
                                                }}
    
                                            />
    
                                            :
    
                                            "No Image"
    
                                        }
    
                                    </td>
    
                                    <td>{item.product_name}</td>
    
                                    <td>{item.category}</td>
    
                                    <td>{item.metal}</td>
    
                                    <td>{item.purity}</td>
    
                                    <td>{item.weight}</td>
    
                                    <td>₹ {item.price}</td>
    
                                    <td>{item.stock}</td>
    
                                    <td>
    
                                    <button
className="btn btn-primary btn-sm me-2"
onClick={() => openEditModal(item)}
>
Edit
</button>
    
<button
className="btn btn-danger btn-sm"
onClick={() => deleteProduct(item.product_id)}
>
Delete
</button>
    
                                    </td>
    
                                </tr>
    
                            ))
    
                        )
    
                    }
    
                </tbody>
    
            </table>
    
            {/* ==========================
                  Add Product Modal
            ========================== */}
    
            <div
                className="modal fade"
                id="addProductModal"
                tabIndex="-1"
            >
    
                <div className="modal-dialog modal-lg">
    
                    <div className="modal-content">
    
                        <div className="modal-header">
    
                            <h4>Add Product</h4>
    
                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
    
                        </div>
    
                        <div className="modal-body">
    
                            <div className="row">
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Product Name"
                                        name="product_name"
                                        value={product.product_name}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Category"
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Metal"
                                        name="metal"
                                        value={product.metal}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Purity"
                                        name="purity"
                                        value={product.purity}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Weight"
                                        name="weight"
                                        value={product.weight}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Making Charges"
                                        name="making_charges"
                                        value={product.making_charges}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-6">
    
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Stock"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-12">
    
                                    <textarea
                                        className="form-control mb-3"
                                        placeholder="Description"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-12">
    
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e)=>setImage(e.target.files[0])}
                                    />
    
                                </div>
    
                            </div>
    
                        </div>
    
                        <div className="modal-footer">

<button
    className="btn btn-secondary"
    data-bs-dismiss="modal"
>
    Cancel
</button>

{
    isEdit ? (

        <button
            className="btn btn-warning"
            onClick={updateProduct}
        >
            Update Product
        </button>

    ) : (

        <button
            className="btn btn-success"
            onClick={addProduct}
        >
            Save Product
        </button>

    )
}

</div>
                    </div>
    
                </div>
    
            </div>
    
        </div>
    
    );
}

    export default Products;