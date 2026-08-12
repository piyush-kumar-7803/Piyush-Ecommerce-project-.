import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createProduct, getProductById, updateProduct} from "../../services/productService";
import {getAllCategories} from "../../services/categoryService";
import {useToast} from "../../context/ToastContext";
import Loader from "../../components/Loader";

function AddProduct() {
    const {id} = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const {showToast} = useToast();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
    });

    useEffect(() => {
        getAllCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        if (!isEditing) return;
        getProductById(id)
            .then((product) => {
                setForm({
                    name: product.name || "",
                    description: product.description || "",
                    price: product.price ?? "",
                    stock: product.stock ?? "",
                    categoryId: product.category?.categoryId ?? "",
                });
            })
            .catch(() => showToast("Could not load product", "error"))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditing && !imageFile) {
            showToast("Please select an image", "error");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                category: {categoryId: Number(form.categoryId)},
            };

            if (isEditing) {
                await updateProduct(id, payload, imageFile);
                showToast("Product updated");
            } else {
                await createProduct(payload, imageFile);
                showToast("Product created");
            }
            navigate("/admin/products");
        } catch {
            showToast("Could not save product", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader label="Loading product..."/>;

    return (
        <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
                {isEditing ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            required
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            min="0"
                            required
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                        name="categoryId"
                        required
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((c) => (
                            <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Image {isEditing && "(leave empty to keep current image)"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
                >
                    {saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;