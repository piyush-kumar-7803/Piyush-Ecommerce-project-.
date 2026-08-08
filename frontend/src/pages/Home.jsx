import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">

            <div className="text-center">

                <h1 className="text-4xl font-bold mb-4">
                    Welcome to MyShop
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    Simple and easy online shopping.
                </p>

                <Link
                    to="/products"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Browse Products
                </Link>

            </div>

        </div>
    );
}

export default Home;