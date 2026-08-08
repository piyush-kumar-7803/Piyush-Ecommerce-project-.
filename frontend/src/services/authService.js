import api from "./api";

// Register new user
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);

    return response.data;
};

// Login user
export const loginUser = async (loginData) => {
    const response = await api.post("/auth/login", loginData);

    return response.data;
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};