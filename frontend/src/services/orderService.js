import api from "./api";

// Place an order from the current cart (checkout)
export const placeOrder = async (userId) => {
    const response = await api.post("/orders", null, {params: {userId}});
    return response.data;
};

// Get all orders for a user
export const getOrders = async (userId) => {
    const response = await api.get("/orders", {params: {userId}});
    return response.data;
};

// Get a single order by id
export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

// Cancel an order
export const cancelOrder = async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
};

// Update order status (admin only)
export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, {status});
    return response.data;
};