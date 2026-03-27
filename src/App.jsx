import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import VendorSignup from "./pages/VendorSignup";
import RiderSignup from "./pages/RiderSignup";
import VendorDashboard from "./pages/VendorDashboard";
import DashboardHome from "./components/vendor/DashboardHome";
import VendorMenu from "./components/vendor/VendorMenu";
import VendorOrders from "./components/vendor/VendorOrders";
import VendorHistory from "./components/vendor/VendorHistory";
import VendorProfile from "./components/vendor/VendorProfile";
import VendorRestaurant from "./components/vendor/VendorRestaurant";
import RestaurantMenu from "./pages/RestaurantMenu";
import Orders from "./pages/Orders";
import RiderDashboard from "./pages/RiderDashboard";
import RiderDashboardHome from "./components/rider/RiderDashboardHome";
import RiderAvailable from "./components/rider/RiderAvailable";
import RiderActive from "./components/rider/RiderActive";
import RiderHistory from "./components/rider/RiderHistory";
import RiderProfile from "./components/rider/RiderProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/rider-signup" element={<RiderSignup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="menu" element={<VendorMenu />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="history" element={<VendorHistory />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="restaurant" element={<VendorRestaurant />} />
        </Route>
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />}>
          <Route index element={<RiderDashboardHome />} />
          <Route path="available" element={<RiderAvailable />} />
          <Route path="active" element={<RiderActive />} />
          <Route path="history" element={<RiderHistory />} />
          <Route path="profile" element={<RiderProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;