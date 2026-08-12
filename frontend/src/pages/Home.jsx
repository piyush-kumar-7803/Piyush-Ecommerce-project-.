import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getAllProducts} from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
            .then((data) => setProducts(data.slice(0, 4)))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <div className="max-w-6xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Shop smarter, ship faster.
                    </h1>
                    <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                        Quality products, honest prices, and a checkout that doesn't get in your way.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-indigo-500 text-white px-7 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
                    <Link to="/products" className="text-sm font-medium text-indigo-600 hover:underline">
                        View all →
                    </Link>
                </div>

                {loading ? (
                    <Loader label="Loading products..."/>
                ) : products.length === 0 ? (
                    <p className="text-slate-500 text-center py-12">
                        No products available right now. Check back soon.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {products.map((product) => (
                            <ProductCard key={product.productId} product={product}/>
                        ))}
                    </div>
                )}
            </section>

            <section className="border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <div
                            className="h-11 w-11 mx-auto mb-3 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">1
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">Browse</h3>
                        <p className="text-sm text-slate-500">Explore our full catalog of products.</p>
                    </div>
                    <div>
                        <div
                            className="h-11 w-11 mx-auto mb-3 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">2
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">Add to Cart</h3>
                        <p className="text-sm text-slate-500">Pick what you like and keep shopping.</p>
                    </div>
                    <div>
                        <div
                            className="h-11 w-11 mx-auto mb-3 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">3
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">Checkout</h3>
                        <p className="text-sm text-slate-500">Place your order and track it anytime.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;