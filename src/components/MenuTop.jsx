import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ShoppingCart, Search, LogOut, ClipboardList } from "lucide-react";


const MenuTop = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-6 py-4 bg-orange-100 items-center justify-between sticky top-0">
      <Link to="/menu">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" className="size-12" />
          <h1 className="text-xl md:text-2xl text-orange-400 font-bold">
            CampusBite
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-10 w-full md:w-auto">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none"
          />
        </div>

        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        <Link to="/orders">
          <ClipboardList size={28} />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default MenuTop;