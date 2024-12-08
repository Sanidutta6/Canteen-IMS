import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to parse cookies
    const getCookieValue = (name) => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`));
        return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            try {
                const userData = getCookieValue("userData");
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Failed to parse user data from cookies:", error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Mock login logic
            let user = null;
            if (email === "manager@example.com" && password === "password") {
                user = { id: "1", name: "Manager", role: "manager" };
            } else if (email === "staff@example.com" && password === "password") {
                user = { id: "2", name: "Staff", role: "staff" };
            } else {
                throw new Error("Invalid credentials");
            }

            setUser(user);
            setIsAuthenticated(true);
            document.cookie = `userData=${encodeURIComponent(
                JSON.stringify(user)
            )}; path=/; secure; samesite=strict`;
        } catch (error) {
            console.error("Login failed:", error);
            setUser(null);
            setIsAuthenticated(false);
            throw error; // Let the caller handle the error
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoading(true);
        try {
            setUser(null);
            setIsAuthenticated(false);
            document.cookie =
                "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
