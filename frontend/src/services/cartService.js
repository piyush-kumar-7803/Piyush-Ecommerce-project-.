import api from "./api";

// Get the current user's cart
export const getCart = async (userId) => {
    const response = await api.get("/cart", {params: {userId}});
    return response.data;
};

// Add a product to the cart
export const addToCart = async (userId, productId, quantity) => {
    const response = await api.post(
        "/cart/items",
        null,
        {params: {userId, productId, quantity}}
    );
    return response.data;
};

// Change the quantity of an item already in the cart
export const updateCartItem = async (userId, productId, quantity) => {
    const response = await api.put(
        `/cart/items/${productId}`,
        {quantity},
        {params: {userId}}
    );
    return response.data;
};

// Remove a single item from the cart
export const removeCartItem = async (userId, productId) => {
    const response = await api.delete(
        `/cart/items/${productId}`,
        {params: {userId}}
    );
    return response.data;
};

// Empty the entire cart
export const emptyCart = async (userId) => {
    const response = await api.delete("/cart", {params: {userId}});
    return response.data;
};