import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {getOrders} from "../services/orderService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const statusStyles = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-indigo-100 text-indigo-700",
    DELIVERED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-rose-100 text-rose-700",
};

function Orders() {
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.userId) return;
        getOrders(user.userId)
            .then(setOrders)
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <Loader label="Loading your orders..."/>;

    if (orders.length === 0) {
        return (
            <EmptyState
                title="No orders yet"
                description="Once you place an order, it'll show up here."
                actionLabel="Browse Products"
                actionTo="/products"
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">My Orders</h1>

            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <Link
                        key={order.orderId}
                        to={`/orders/${order.orderId}`}
                        className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                        <div>
                            <p className="font-semibold text-slate-900">Order #{order.orderId}</p>
                            <p className="text-sm text-slate-500">
                                {order.orderDate
                                    ? new Date(order.orderDate).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : ""}
                                {" · "}
                                {order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-bold text-slate-900">
                                ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                            </span>
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    statusStyles[order.status] || "bg-slate-100 text-slate-600"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Orders;