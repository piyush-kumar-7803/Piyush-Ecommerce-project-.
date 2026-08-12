import {useState} from "react";
import {getOrderById, updateOrderStatus} from "../../services/orderService";
import {useToast} from "../../context/ToastContext";
import Loader from "../../components/Loader";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

function ManageOrders() {
    const {showToast} = useToast();
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!orderId) return;
        setLoading(true);
        setOrder(null);
        try {
            const data = await getOrderById(orderId);
            setOrder(data);
        } catch {
            showToast("Order not found", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (status) => {
        setUpdating(true);
        try {
            const updated = await updateOrderStatus(order.orderId, status);
            setOrder(updated);
            showToast("Order status updated");
        } catch {
            showToast("Could not update status", "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <p className="text-sm text-slate-500 mb-6">
                Look up an order by its ID to view details and update its status.
            </p>

            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter order ID"
                    className="flex-1 border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    Search
                </button>
            </form>

            {loading && <Loader label="Searching..."/>}

            {order && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h2 className="font-semibold text-slate-900 mb-1">Order #{order.orderId}</h2>
                    <p className="text-sm text-slate-500 mb-4">
                        Total: ₹{Number(order.totalAmount).toLocaleString("en-IN")} · {order.items?.length || 0} item(s)
                    </p>

                    <div className="divide-y divide-slate-100 mb-6">
                        {order.items?.map((item) => (
                            <div key={item.productId} className="flex justify-between py-2 text-sm">
                                <span className="text-slate-700">{item.productName} × {item.quantity}</span>
                                <span className="text-slate-900 font-medium">
                                    ₹{Number(item.total).toLocaleString("en-IN")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <div className="flex flex-wrap gap-2">
                        {STATUSES.map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                disabled={updating || order.status === status}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:cursor-default ${
                                    order.status === status
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageOrders;