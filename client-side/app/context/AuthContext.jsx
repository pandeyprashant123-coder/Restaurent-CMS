import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken, clearToken] = useLocalStorage("authToken", null);

  const login = (newToken, rememberMe = true) => {
    setToken(newToken, rememberMe); // Pass `rememberMe` to dynamically choose storage
  };

  const logout = () => {
    clearToken(); // Use clearValue to clear storage
  };

  const isAuthenticated = token !== null;
  // useEffect(() => {
  //   if (token) {
  //     console.log("Token rehydrated:", token);
  //   }
  // }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
