"use client";
import { usePathname } from "next/navigation";

import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";

export function Providers({ children }) {
  const currentPath = usePathname();

  console.log(currentPath);
  return (
    <AuthProvider>
      <FoodProvider>{children}</FoodProvider>
    </AuthProvider>
  );
}
