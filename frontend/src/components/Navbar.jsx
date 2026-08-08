import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold">
                    MyShop
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-gray-300"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="hover:text-gray-300"
                    >
                        Products
                    </Link>

                    <Link
                        to="/cart"
                        className="hover:text-gray-300"
                    >
                        Cart
                    </Link>

                    <Link
                        to="/orders"
                        className="hover:text-gray-300"
                    >
                        Orders
                    </Link>

                    <Link
                        to="/login"
                        className="hover:text-gray-300"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;