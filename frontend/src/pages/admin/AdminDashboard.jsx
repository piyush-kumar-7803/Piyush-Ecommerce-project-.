import {Link, Outlet, useLocation} from "react-router-dom";

const links = [
    {to: "/admin", label: "Overview", end: true},
    {to: "/admin/products", label: "Products"},
    {to: "/admin/categories", label: "Categories"},
    {to: "/admin/orders", label: "Orders"},
];

function AdminDashboard() {
    const location = useLocation();

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

            <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto">
                {links.map((link) => {
                    const isActive = link.end
                        ? location.pathname === link.to
                        : location.pathname.startsWith(link.to);
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                                isActive
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {location.pathname === "/admin" ? (
                <div className="grid sm:grid-cols-3 gap-5">
                    <Link to="/admin/products"
                          className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                        <h3 className="font-semibold text-slate-900 mb-1">Manage Products</h3>
                        <p className="text-sm text-slate-500">Add, edit, or remove products.</p>
                    </Link>
                    <Link to="/admin/categories"
                          className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                        <h3 className="font-semibold text-slate-900 mb-1">Manage Categories</h3>
                        <p className="text-sm text-slate-500">Organize your product catalog.</p>
                    </Link>
                    <Link to="/admin/orders"
                          className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                        <h3 className="font-semibold text-slate-900 mb-1">Manage Orders</h3>
                        <p className="text-sm text-slate-500">Look up an order and update its status.</p>
                    </Link>
                </div>
            ) : (
                <Outlet/>
            )}
        </div>
    );
}

export default AdminDashboard;