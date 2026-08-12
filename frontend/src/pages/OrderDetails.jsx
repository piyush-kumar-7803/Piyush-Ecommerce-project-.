import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {cancelOrder, getOrderById} from "../services/orderService";
import {useToast} from "../context/ToastContext";
import Loader from "../components/Loader";

const statusStyles = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-indigo-100 text-indigo-700",
    DELIVERED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-rose-100 text-rose-700",
};

function OrderDetails() {
    const {id} = useParams();
    const {showToast} = useToast();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    const loadOrder = () => {
        setLoading(true);
        getOrderById(id)
            .then(setOrder)
            .catch(() => setOrder(null))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleCancel = async () => {
        setCancelling(true);
        try {
            await cancelOrder(id);
            showToast("Order cancelled", "info");
            loadOrder();
        } catch (err) {
            showToast(err?.response?.data?.message || "Could not cancel order", "error");
        } finally {
            setCancelling(false);
        }
    };

    if (loading) return <Loader label="Loading order..."/>;

    if (!order) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center text-slate-500">
                Order not found.
            </div>
        );
    }

    const canCancel = order.status === "PENDING" || order.status === "CONFIRMED";

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <Link to="/orders" className="text-sm text-indigo-600 font-medium hover:underline mb-6 inline-block">
                ← Back to Orders
            </Link>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between mb-1">
                    <h1 className="text-2xl font-bold text-slate-900">Order #{order.orderId}</h1>
                    <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                            statusStyles[order.status] || "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {order.status}
                    </span>
                </div>
                <p className="text-sm text-slate-500">
                    Placed on{" "}
                    {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "—"}
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 mb-6">
                {order.items?.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-medium text-slate-900">{item.productName}</p>
                            <p className="text-sm text-slate-500">
                                {item.quantity} × ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                        </div>
                        <span className="font-semibold text-slate-900">
                            ₹{Number(item.total).toLocaleString("en-IN")}
                        </span>
                    </div>
                ))}

                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-b-2xl">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-slate-900 text-lg">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {canCancel && (
                <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="text-sm font-medium text-rose-600 border border-rose-200 px-5 py-2.5 rounded-xl hover:bg-rose-50 transition-colors disabled:opacity-50"
                >
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
            )}
        </div>
    );
}

export default OrderDetails;