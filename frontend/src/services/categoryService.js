import api from "./api";

// Get all categories
export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};

// Create a category (admin only)
export const createCategory = async (categoryData) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
};

// Update a category (admin only)
export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
};

// Delete a category (admin only)
export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};