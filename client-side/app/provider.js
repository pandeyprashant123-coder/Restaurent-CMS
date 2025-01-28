"use client";
import { usePathname } from "next/navigation";

import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export function Providers({ children }) {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <AuthProvider>
      {currentPath !== ("/vendor-dashboard" || "/admin") && <Navbar />}
      <FoodProvider>{children}</FoodProvider>
      {currentPath !== ("/vendor-dashboard" || "/admin") && <Footer />}
    </AuthProvider>
  );
}
