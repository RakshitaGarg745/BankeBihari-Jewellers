
const scrollToCategories = () => {

    document
        .getElementById("categories")
        ?.scrollIntoView({
            behavior: "smooth"
        });

};
function HeroSection() {

    return (

        <section
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white"
            }}
        >

            <div>

                <h1
                    style={{
                        fontSize: "65px",
                        fontWeight: "bold",
                        color: "#D4AF37"
                    }}
                >
                    💍 Shree Banke Bihari Jewellers
                </h1>

                <h2
                    style={{
                        marginTop: "20px",
                        fontWeight: "300"
                    }}
                >
                    Where Tradition Meets Elegance
                </h2>

                <p
                    style={{
                        marginTop: "20px",
                        fontSize: "20px"
                    }}
                >
                    Gold • Silver • Diamond • Platinum
                </p>

                <button
    className="btn btn-warning btn-lg mt-4"
    style={{
        padding: "12px 35px",
        fontWeight: "bold",
        borderRadius: "30px"
    }}
    onClick={scrollToCategories}
>
    Explore Collection
</button>

            </div>

        </section>

    );

}

export default HeroSection;