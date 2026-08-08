function Register() {
    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6">
                Create Account
            </h1>

            <form className="space-y-4">

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;