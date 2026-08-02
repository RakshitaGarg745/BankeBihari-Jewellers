import { Link } from "react-router-dom";
import "./CategorySection.css";

function CategorySection() {

    const categories = [
        {
            name: "Rings",      // Display on UI
            value: "Ring",      // Matches database
            image: "/images/ring.jpg"
        },
        {
            name: "Necklaces",
            value: "Necklace",
            image: "/images/necklace.jpg"
        },
        {
            name: "Earrings",
            value: "Earring",
            image: "/images/earrings.jpg"
        },
        {
            name: "Bangles",
            value: "Bangle",
            image: "/images/bangles.jpg"
        },
        {
            name: "Bracelets",
            value: "Bracelet",
            image: "/images/bracelet.jpg"
        },
        {
            name: "Pendants",
            value: "Pendant",
            image: "/images/pendant.jpg"
        },
        {
            name: "Anklets",
            value: "Anklet",
            image: "/images/anklet.jpg"
        }
    ];
    return (

        <div
    id="categories"
    className="container mt-5"
>

            <h2 className="text-center fw-bold mb-4">
                Shop By Category
            </h2>

            <div className="row">

                {categories.map((category, index) => (

                    <div className="col-lg-4 col-md-6 mb-4" key={index}>

                        <Link
                           to={`/category/${category.value}`}
                            className="text-decoration-none"
                        >

                            <div className="category-card shadow">

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="category-image"
                                />

                                <div className="category-overlay">

                                    <h4>{category.name}</h4>

                                </div>

                            </div>

                        </Link>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default CategorySection;