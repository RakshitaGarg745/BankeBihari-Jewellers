import { useEffect, useState } from "react";

import axios from "axios";

function Products(){

    const [products,setProducts]=useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products`)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Axios Error:", err);
            });
    }, []);

    return(

        <div className="container mt-4">

            <h2>Products</h2>

            <button
className="btn btn-success mb-3"
onClick={()=>{
window.location="/add-product";
}}
>
+ Add Product
</button>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map((p)=>(

                            <tr key={p.product_id}>

                                <td>{p.product_id}</td>

                                <td>{p.product_name}</td>

                                <td>{p.category}</td>

                                <td>₹ {p.price}</td>

                                <td>{p.stock}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Products;