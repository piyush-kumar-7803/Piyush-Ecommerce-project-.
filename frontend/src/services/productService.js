import api from "./api";

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api$/, "")
    : "http://localhost:8080";

// Resolve a product's image to a full URL (backend serves images as relative paths)
export const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${IMAGE_BASE_URL}${imageUrl}`;
};

// Get all products
export const getAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

// Get a single product by id
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// Create a product (admin only). productData: {name, description, price, stock, category:{categoryId}}
export const createProduct = async (productData, imageFile) => {
    const formData = new FormData();
    formData.append(
        "product",
        new Blob([JSON.stringify(productData)], {type: "application/json"})
    );
    formData.append("image", imageFile);

    const response = await api.post("/products", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
    return response.data;
};

// Update a product (admin only)
export const updateProduct = async (id, productData, imageFile) => {
    const formData = new FormData();
    formData.append(
        "product",
        new Blob([JSON.stringify(productData)], {type: "application/json"})
    );
    if (imageFile) {
        formData.append("image", imageFile);
    }

    const response = await api.put(`/products/${id}`, formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
    return response.data;
};

// Delete a product (admin only)
export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};