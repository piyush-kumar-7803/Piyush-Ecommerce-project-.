import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getProductById, resolveImageUrl} from "../services/productService";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import {useToast} from "../context/ToastContext";
import Loader from "../components/Loader";

function ProductDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();
    const {addItem} = useCart();
    const {showToast} = useToast();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then(setProduct)
            .catch(() => setError("Product not found."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            navigate("/login", {state: {from: `/products/${id}`}});
            return;
        }
        setAdding(true);
        try {
            await addItem(product.productId, quantity);
            showToast("Added to cart");
        } catch {
            showToast("Could not add to cart", "error");
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <Loader label="Loading product..."/>;

    if (error || !product) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <p className="text-slate-500">{error || "Product not found."}</p>
            </div>
        );
    }

    const image = resolveImageUrl(product.imageUrl);
    const outOfStock = product.stock <= 0;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">

                <div
                    className="aspect-square bg-slate-100 rounded-3xl overflow-hidden flex items-center justify-center shadow-sm">
                    {image ? (
                        <img src={image} alt={product.name} className="h-full w-full object-cover"/>
                    ) : (
                        <span className="text-slate-300 text-sm">No image</span>
                    )}
                </div>

                <div className="flex flex-col">
                    {product.category?.categoryName && (
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                            {product.category.categoryName}
                        </span>
                    )}

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">{product.name}</h1>

                    <p className="text-2xl font-bold text-slate-900 mb-4">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                    {product.description && (
                        <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
                    )}

                    <p className={`text-sm font-semibold mb-6 ${outOfStock ? "text-rose-600" : "text-emerald-600"}`}>
                        {outOfStock ? "Out of stock" : `${product.stock} in stock`}
                    </p>

                    {!outOfStock && (
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center border border-slate-200 rounded-full bg-white">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-l-full"
                                >
                                    −
                                </button>
                                <span className="px-4 text-sm font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-r-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={outOfStock || adding}
                        className="w-full sm:w-auto bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {outOfStock ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;