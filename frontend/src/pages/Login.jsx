import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useToast} from "../context/ToastContext";

function Login() {
    const {login} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(form);
            showToast("Welcome back!");
            const redirectTo = location.state?.from || "/";
            navigate(redirectTo, {replace: true});
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-slate-50 to-indigo-50/40 flex items-center justify-center px-6 py-12">
            <div
                className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">

                <div
                    className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold mb-5 shadow-lg shadow-indigo-500/25">
                    P
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
                <p className="text-slate-500 text-sm mb-6">Log in to continue shopping.</p>

                {error && (
                    <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;