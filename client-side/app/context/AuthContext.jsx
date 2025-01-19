// context/AuthContext.js
import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("authToken", null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null); // Clear the token on logout
  };

  const isAuthenticated = token !== null;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
