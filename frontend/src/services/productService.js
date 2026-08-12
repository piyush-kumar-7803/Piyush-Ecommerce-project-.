import api from "./api";

const IMAGE_BASE_URL = "http://localhost:8080";

export const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${IMAGE_BASE_URL}${imageUrl}`;
};

export const getAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

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

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};