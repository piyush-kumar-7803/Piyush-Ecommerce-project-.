import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useToast} from "../context/ToastContext";

function Register() {
    const {register} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            await register(form);
            showToast("Account created!");
            navigate("/", {replace: true});
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Could not create your account. Please try again."
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

                <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
                <p className="text-slate-500 text-sm mb-6">Join Piyush Store in a few seconds.</p>

                {error && (
                    <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            required
                            value={form.userName}
                            onChange={handleChange}
                            placeholder="janedoe"
                            className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="9876543210"
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
                            placeholder="At least 6 characters"
                            className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;