import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const MenuTop = () => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-6 py-4 bg-orange-100 items-center justify-between">
      <Link to="/">
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
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none"
          />
        </div>

        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </nav>
  );
};

export default MenuTop;