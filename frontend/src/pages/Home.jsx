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
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(217,70,239,0.25),transparent_50%)]"/>
                <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
                    <span
                        className="inline-block text-xs font-semibold tracking-wide uppercase text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-1.5 mb-6">
                        Welcome to Piyush Store
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-5 tracking-tight leading-[1.1]">
                        Shop smarter,<br/>ship faster.
                    </h1>
                    <p className="text-slate-300 text-lg mb-9 max-w-xl mx-auto">
                        Quality products, honest prices, and a checkout that doesn't get in your way.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-500/30"
                    >
                        Browse Products
                    </Link>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
                    <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:underline">
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
                <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <div
                            className="h-12 w-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">1
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">Browse</h3>
                        <p className="text-sm text-slate-500">Explore our full catalog of products.</p>
                    </div>
                    <div>
                        <div
                            className="h-12 w-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">2
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">Add to Cart</h3>
                        <p className="text-sm text-slate-500">Pick what you like and keep shopping.</p>
                    </div>
                    <div>
                        <div
                            className="h-12 w-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">3
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