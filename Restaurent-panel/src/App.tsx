import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "../../client-side/app/Dashboard/Dashboard";
import Coupons from "../../client-side/app/components/Promotions/Coupons";
import AddNew from "../../client-side/app/components/foodManagement/foods/AddNew";
import List from "../../client-side/app/components/foodManagement/foods/List";
import DashboardContent from "../../client-side/app/components/DashboardContent";
import PointOfSale from "../../client-side/app/components/PointOfSale";
import Addons from "../../client-side/app/components/foodManagement/Addons";
import Settings from "../../client-side/app/components/Settings";
import NewAd from "../../client-side/app/components/AdvertisementManagement/NewAd";
import PendingAds from "../../client-side/app/components/AdvertisementManagement/AdvertisementList/Pending";
import Basic from "../../client-side/app/components/Promotions/campaign/BasicCoupon";
import FoodCampaign from "../../client-side/app/components/Promotions/campaign/FoodCampaign";
import AdsList from "../../client-side/app/components/AdvertisementManagement/AdvertisementList/AdList";
import RestaurantConfig from "../../client-side/app/components/BusinessManagement/RestaurantConfig";
import NotificationSetup from "../../client-side/app/components/BusinessManagement/NotificationSetup";
import OrderView from "../../client-side/app/components/OrderManagement/Orders/OrderView";
import Login from "../../client-side/app/login/Login";
import AllOrders from "../../client-side/app/components/OrderManagement/Orders/orders/AllOrders";
import MyShop from "../../client-side/app/components/BusinessManagement/MyShop";
import RestaurentWallet from "../../client-side/app/components/BusinessManagement/RestaurentWallet";
import EmployeeRole from "../../client-side/app/components/EmployeeSection/EmployeeRole";
import AddEmployee from "../../client-side/app/components/EmployeeSection/Employees/AddEmployee";

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
            <Route
              path="employee-section/employee-role"
              element={<EmployeeRole />}
            />
            <Route
              path="employee-section/employee/add-new-employee"
              element={<AddEmployee />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
