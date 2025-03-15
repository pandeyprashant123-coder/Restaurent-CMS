"use client";
import { usePathname } from "next/navigation";

import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  const currentPath = usePathname();

  return (
    <AuthProvider>
      <FoodProvider>{children}</FoodProvider>
    </AuthProvider>
  );
}
