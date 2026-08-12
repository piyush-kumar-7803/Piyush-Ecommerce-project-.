import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteProduct, getAllProducts, resolveImageUrl} from "../../services/productService";
import {useToast} from "../../context/ToastContext";
import Loader from "../../components/Loader";

function ManageProduct() {
    const {showToast} = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const load = () => {
        setLoading(true);
        getAllProducts()
            .then(setProducts)
            .catch(() => showToast("Could not load products", "error"))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this product? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            await deleteProduct(id);
            showToast("Product deleted", "info");
            setProducts((prev) => prev.filter((p) => p.productId !== id));
        } catch {
            showToast("Could not delete product", "error");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <Loader label="Loading products..."/>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    {products.length} product{products.length === 1 ? "" : "s"}
                </h2>
                <Link
                    to="/admin/products/new"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
                {products.map((product) => {
                    const image = resolveImageUrl(product.imageUrl);
                    return (
                        <div key={product.productId} className="flex items-center gap-4 p-4">
                            <div
                                className="h-14 w-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                                {image ? (
                                    <img src={image} alt={product.name} className="h-full w-full object-cover"/>
                                ) : (
                                    <span className="text-slate-300 text-[10px]">No image</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate">{product.name}</p>
                                <p className="text-sm text-slate-500">
                                    {product.category?.categoryName || "Uncategorized"} · {product.stock} in stock
                                </p>
                            </div>

                            <span className="font-medium text-slate-900 whitespace-nowrap">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </span>

                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/admin/products/${product.productId}/edit`}
                                    className="text-sm font-medium text-indigo-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.productId)}
                                    disabled={deletingId === product.productId}
                                    className="text-sm font-medium text-rose-600 hover:underline disabled:opacity-50"
                                >
                                    {deletingId === product.productId ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    );
                })}

                {products.length === 0 && (
                    <p className="text-center text-slate-500 py-10">No products yet.</p>
                )}
            </div>
        </div>
    );
}

export default ManageProduct;