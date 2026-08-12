import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/CartContext";
import {useToast} from "../context/ToastContext";
import {useAuth} from "../context/AuthContext";
import {placeOrder} from "../services/orderService";
import {resolveImageUrl} from "../services/productService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

function Cart() {
    const {cart, loading, updateItem, removeItem, refreshCart} = useCart();
    const {showToast} = useToast();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [busyId, setBusyId] = useState(null);
    const [checkingOut, setCheckingOut] = useState(false);

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) return;
        setBusyId(productId);
        try {
            await updateItem(productId, quantity);
        } catch {
            showToast("Could not update quantity", "error");
        } finally {
            setBusyId(null);
        }
    };

    const handleRemove = async (productId) => {
        setBusyId(productId);
        try {
            await removeItem(productId);
            showToast("Removed from cart", "info");
        } catch {
            showToast("Could not remove item", "error");
        } finally {
            setBusyId(null);
        }
    };

    const handleCheckout = async () => {
        setCheckingOut(true);
        try {
            const order = await placeOrder(user.userId);
            showToast("Order placed!");
            await refreshCart();
            navigate(`/orders/${order.orderId}`);
        } catch (err) {
            showToast(
                err?.response?.data?.message || "Checkout failed. Please try again.",
                "error"
            );
        } finally {
            setCheckingOut(false);
        }
    };

    if (loading && !cart) return <Loader label="Loading cart..."/>;

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <EmptyState
                title="Your cart is empty"
                description="Browse our products and add something you like."
                actionLabel="Browse Products"
                actionTo="/products"
            />
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {cart.items.map((item) => {
                        const image = resolveImageUrl(item.imageUrl);
                        const isBusy = busyId === item.productId;

                        return (
                            <div
                                key={item.productId}
                                className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-4"
                            >
                                <div
                                    className="h-20 w-20 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                    {image ? (
                                        <img src={image} alt={item.productName} className="h-full w-full object-cover"/>
                                    ) : (
                                        <span className="text-slate-300 text-xs">No image</span>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between gap-3">
                                        <h3 className="font-medium text-slate-900">{item.productName}</h3>
                                        <span className="font-semibold text-slate-900 whitespace-nowrap">
                                            ₹{Number(item.totalPrice ?? item.price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        ₹{Number(item.price).toLocaleString("en-IN")} each
                                    </p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-slate-300 rounded-lg">
                                            <button
                                                disabled={isBusy}
                                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                −
                                            </button>
                                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                disabled={isBusy}
                                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            disabled={isBusy}
                                            onClick={() => handleRemove(item.productId)}
                                            className="text-sm text-rose-600 font-medium hover:underline disabled:opacity-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit sticky top-24">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>

                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Subtotal</span>
                        <span>₹{Number(cart.grandTotal).toLocaleString("en-IN")}</span>
                    </div>

                    <div
                        className="flex justify-between text-base font-semibold text-slate-900 border-t border-slate-200 mt-4 pt-4 mb-6">
                        <span>Total</span>
                        <span>₹{Number(cart.grandTotal).toLocaleString("en-IN")}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={checkingOut}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
                    >
                        {checkingOut ? "Placing order..." : "Checkout"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;