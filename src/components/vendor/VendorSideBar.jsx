import { supabase } from "../../supabaseClient";
import { useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, PackageOpen, User, History, LogOut } from "lucide-react";

const VendorSideBar = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <aside className="flex flex-col h-screen w-64 bg-white shadow-lg">

      
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-orange-400">CampusBite</h1>
      </div>

      
      <nav className="flex-1 m-5">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/vendor-dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-red-50"}`
              }
            >
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vendor-dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-red-50"}`
              }
            >
              <User size={20} /> Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vendor-dashboard/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-red-50"}`
              }
            >
              <PackageOpen size={20} /> Order
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vendor-dashboard/menu"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-red-50"}`
              }
            >
              <UtensilsCrossed size={20} /> Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vendor-dashboard/history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-red-50"}`
              }
            >
              <History size={20} /> History
            </NavLink>
          </li>
        </ul>
      </nav>

      
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-red-500 hover:bg-red-50 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default VendorSideBar;