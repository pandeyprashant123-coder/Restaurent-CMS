"use client";

import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <FoodProvider>{children}</FoodProvider>
    </AuthProvider>
  );
}
