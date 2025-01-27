import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken, clearToken] = useLocalStorage("authToken", null);
  const [user, setUser, clearUser] = useLocalStorage("user", null);

  const login = (newToken, user, rememberMe = true) => {
    setToken(newToken, rememberMe);
    setUser(JSON.stringify(user));
  };

  const logout = () => {
    clearToken(); // Use clearValue to clear storage
    clearUser();
  };

  const isAuthenticated = token !== null;
  // useEffect(() => {
  //   if (token) {
  //     console.log("Token rehydrated:", token);
  //   }
  // }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
