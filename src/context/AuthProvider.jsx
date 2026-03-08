import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext.js";
import { getMe } from "../api/users-api.js";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (user, token) => {
        localStorage.setItem("token", token);
        setUser(user);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    const isLoggedIn = () => {
        return user !== null;
    }

    const isAdmin = () => {
        return user?.role === "admin";
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
            return;
        }
        (async () => {
            try {
                const user = await getMe(savedToken);
                setUser(user);
                setToken(savedToken);
            }
            catch (e) {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            }
        })();
    }, [])

    const value = { user, token, login, logout, isLoggedIn, isAdmin };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}