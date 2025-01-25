import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cuisines from "./pages/Cuisines";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Restaurents from "./pages/Restaurents";
import DeliveryManRegistration from "./components/delivery-man-registration";
import RestaurantRegistration from "./components/restaurant-registration";
import DineInRestaurant from "./components/DineInRestaurant";
import Footer from "./components/common/Footer";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mt-24">
      {/* <ToastContainer /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cuisines" element={<Cuisines />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/restaurents" element={<Restaurents />} />
        <Route path="/dine-in-restaurant" element={<DineInRestaurant />} />
        <Route
          path="/delivery-man-registration"
          element={<DeliveryManRegistration />}
        />
        <Route
          path="/restaurant-registration"
          element={<RestaurantRegistration />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
