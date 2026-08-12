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
                <h1 className="text-3xl font-bold text-slate-900">Products</h1>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full sm:w-64 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
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
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                String(activeCategory) === String(c.categoryId)
                                    ? "bg-slate-900 text-white border-slate-900"
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