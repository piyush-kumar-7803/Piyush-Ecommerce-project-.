import {useEffect, useState} from "react";
import {createCategory, deleteCategory, getAllCategories, updateCategory,} from "../../services/categoryService";
import {useToast} from "../../context/ToastContext";
import Loader from "../../components/Loader";

function ManageCategories() {
    const {showToast} = useToast();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({categoryName: "", categoryDescription: ""});
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        getAllCategories()
            .then(setCategories)
            .catch(() => showToast("Could not load categories", "error"))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const resetForm = () => {
        setForm({categoryName: "", categoryDescription: ""});
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await updateCategory(editingId, form);
                showToast("Category updated");
            } else {
                await createCategory(form);
                showToast("Category created");
            }
            resetForm();
            load();
        } catch {
            showToast("Could not save category", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.categoryId);
        setForm({
            categoryName: category.categoryName,
            categoryDescription: category.categoryDescription || "",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this category?")) return;
        try {
            await deleteCategory(id);
            showToast("Category deleted", "info");
            setCategories((prev) => prev.filter((c) => c.categoryId !== id));
        } catch {
            showToast("Could not delete category. It may have products linked to it.", "error");
        }
    };

    if (loading) return <Loader label="Loading categories..."/>;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <form
                onSubmit={handleSubmit}
                className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 h-fit space-y-4"
            >
                <h2 className="font-semibold text-slate-900">
                    {editingId ? "Edit Category" : "New Category"}
                </h2>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                        type="text"
                        required
                        value={form.categoryName}
                        onChange={(e) => setForm({...form, categoryName: e.target.value})}
                        className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        rows={2}
                        value={form.categoryDescription}
                        onChange={(e) => setForm({...form, categoryDescription: e.target.value})}
                        className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
                    >
                        {saving ? "Saving..." : editingId ? "Update" : "Create"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
                {categories.map((c) => (
                    <div key={c.categoryId} className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium text-slate-900">{c.categoryName}</p>
                            {c.categoryDescription && (
                                <p className="text-sm text-slate-500">{c.categoryDescription}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleEdit(c)}
                                className="text-sm font-medium text-indigo-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(c.categoryId)}
                                className="text-sm font-medium text-rose-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <p className="text-center text-slate-500 py-10">No categories yet.</p>
                )}
            </div>
        </div>
    );
}

export default ManageCategories;