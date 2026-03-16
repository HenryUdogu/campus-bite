import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import VendorSignup from "./pages/VendorSignup";
import RiderSignup from "./pages/RiderSignup";
import VendorDashboard from "./pages/VendorDashboard";
import DashboardHome from  "./components/vendor/DashboardHome";
import VendorMenu from "./components/vendor/VendorMenu";
import VendorOrders from "./components/vendor/VendorOrders";
import VendorHistory from "./components/vendor/VendorHistory";
import VendorProfile from "./components/vendor/VendorProfile";
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
        <Route path="/vendor-dashboard" element={<VendorDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="menu" element={<VendorMenu />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="history" element={<VendorHistory />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;