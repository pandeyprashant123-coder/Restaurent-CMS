import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Coupons from "./components/Promotions/Coupons";
import AddNew from "./components/foodManagement/foods/AddNew";
import List from "./components/foodManagement/foods/List";
import DashboardContent from "./components/DashboardContent";
import PointOfSale from "./components/PointOfSale";
import Addons from "./components/foodManagement/Addons";
import Settings from "./components/Settings";
import NewAd from "./components/AdvertisementManagement/NewAd";
import PendingAds from "./components/AdvertisementManagement/AdvertisementList/Pending";
import Basic from "./components/Promotions/campaign/BasicCoupon";
import FoodCampaign from "./components/Promotions/campaign/FoodCampaign";
import AdsList from "./components/AdvertisementManagement/AdvertisementList/AdList";
import RestaurantConfig from "./components/BusinessManagement/RestaurantConfig";
import NotificationSetup from "./components/BusinessManagement/NotificationSetup";
import OrderView from "./components/OrderManagement/Orders/OrderView";
import Login from "./Pages/Login";
import AllOrders from "./components/OrderManagement/Orders/orders/AllOrders";
import MyShop from "./components/BusinessManagement/MyShop";
import RestaurentWallet from "./components/BusinessManagement/RestaurentWallet";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardContent />} />
            <Route path="pos" element={<PointOfSale />} />
            <Route path="profile/view" element={<Settings />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="campaign/basic-campaign" element={<Basic />} />
            <Route path="campaign/food-campaign" element={<FoodCampaign />} />
            <Route path="food-management/Addnew" element={<AddNew />} />
            <Route path="food-management/list" element={<List />} />
            <Route path="food-management/addons" element={<Addons />} />
            <Route path="new-advertisement" element={<NewAd />} />
            <Route path="advertisement-list/pending" element={<PendingAds />} />
            <Route path="advertisement-list/ad-list" element={<AdsList />} />
            <Route path="order-management/orders" element={<AllOrders />} />
            <Route path="order-management/order/view" element={<OrderView />} />
            <Route
              path="business-management/config"
              element={<RestaurantConfig />}
            />
            <Route
              path="business-management/notification-setup"
              element={<NotificationSetup />}
            />
            <Route path="business-management/my-shop" element={<MyShop />} />
            <Route
              path="business-management/my-wallet"
              element={<RestaurentWallet />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
