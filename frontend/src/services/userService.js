import api from "./api";

// Get all users (used after login/register to resolve the current user's id,
// since the auth endpoints don't return it directly)
export const getAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};