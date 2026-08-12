import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";

function Navbar() {
    const {user, isLoggedIn, logout} = useAuth();
    const {itemCount} = useCart();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    const linkClass = "text-sm font-medium text-slate-300 hover:text-white transition-colors";

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link to="/" className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                    <span
                        className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
                        P
                    </span>
                    Piyush Store
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={linkClass}>Home</Link>
                    <Link to="/products" className={linkClass}>Products</Link>
                    {isLoggedIn && <Link to="/orders" className={linkClass}>Orders</Link>}
                    {isLoggedIn && user?.role === "ADMIN" && (
                        <Link to="/admin" className={linkClass}>Admin</Link>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/cart"
                        className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-200" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.874-4.766 2.229-7.348a1.108 1.108 0 00-1.087-1.302H5.106M7.5 14.25L5.106 5.121M7.5 14.25L5.5 20.25m10.5-6l1.85 6m-9.35 0h9.35"/>
                        </svg>
                        {itemCount > 0 && (
                            <span
                                className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <span className="text-sm text-slate-300">Hi, {user.userName}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link to="/login" className={linkClass}>Login</Link>
                            <Link
                                to="/register"
                                className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-200" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4 bg-slate-950">
                    <Link to="/" onClick={() => setMenuOpen(false)} className={linkClass}>Home</Link>
                    <Link to="/products" onClick={() => setMenuOpen(false)} className={linkClass}>Products</Link>
                    {isLoggedIn &&
                        <Link to="/orders" onClick={() => setMenuOpen(false)} className={linkClass}>Orders</Link>}
                    {isLoggedIn && user?.role === "ADMIN" && (
                        <Link to="/admin" onClick={() => setMenuOpen(false)} className={linkClass}>Admin</Link>
                    )}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="text-left text-sm font-medium text-rose-400">
                            Logout ({user.userName})
                        </button>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)} className={linkClass}>Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}
                                  className={linkClass}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;