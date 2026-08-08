import {createContext, useContext, useState} from "react";
import {loginUser, logoutUser, registerUser} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const login = async (loginData) => {

        const data = await loginUser(loginData);

        localStorage.setItem("token", data.token);

        const userData = {
            userName: data.userName,
            email: data.email,
            role: data.role
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        return data;
    };

    const register = async (registerData) => {

        const data = await registerUser(registerData);

        localStorage.setItem("token", data.token);

        const userData = {
            userName: data.userName,
            email: data.email,
            role: data.role
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        return data;
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isLoggedIn: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}