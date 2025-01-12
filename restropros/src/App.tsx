import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Policypage from "./pages/Policypage";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CheckoutSummary from "./pages/CheckoutSummary";
import DashboardContent from "./components/DashboardContent";
import DashboardUser from "./components/DashboardHotels";
import Subscription from "./components/Subscription";
import SubscriptionPending from "./components/SubscriptionPending";
import SubscriptionExpiring from "./components/SubscriptionExpiring";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="policy" element={<Policypage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<CheckoutSummary />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="users" element={<DashboardUser />} />
          <Route path="subscriptionAdd" element={<Subscription />} />
          <Route path="subscriptionPending" element={<SubscriptionPending />} />
          <Route
            path="subscriptionExpiring"
            element={<SubscriptionExpiring />}
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
