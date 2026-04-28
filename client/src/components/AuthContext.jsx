import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem("token");

    const [token, setToken] = useState(storedToken);
    const [user, setUser] = useState(
        storedToken ? jwtDecode(storedToken) : null
    );

    const login = (token) => {
        localStorage.setItem("token", token);

        const decodedUser = jwtDecode(token);

        setToken(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);