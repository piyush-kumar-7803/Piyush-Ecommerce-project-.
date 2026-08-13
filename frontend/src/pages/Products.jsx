import {useEffect, useMemo, useState} from "react";
import {getAllProducts} from "../services/productService";
import {getAllCategories} from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        Promise.all([getAllProducts(), getAllCategories()])
            .then(([productData, categoryData]) => {
                setProducts(productData);
                setCategories(categoryData);
            })
            .catch(() => {
                setProducts([]);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                activeCategory === "all" ||
                String(p.category?.categoryId) === String(activeCategory);
            return matchesSearch && matchesCategory;
        });
    }, [products, search, activeCategory]);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products</h1>

                <div className="relative w-full sm:w-72">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full border border-slate-200 bg-white rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                            activeCategory === "all"
                                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c.categoryId}
                            onClick={() => setActiveCategory(c.categoryId)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                                String(activeCategory) === String(c.categoryId)
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            {c.categoryName}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <Loader label="Loading products..."/>
            ) : filtered.length === 0 ? (
                <EmptyState
                    title="No products found"
                    description="Try a different search term or category."
                />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filtered.map((product) => (
                        <ProductCard key={product.productId} product={product}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;