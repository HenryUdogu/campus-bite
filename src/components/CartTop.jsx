import { Search } from "lucide-react";
import { Link } from "react-router-dom";
const CartTop = () => {
    return (
        <div>
            <nav className="flex flex-row px-6 py-5 bg-orange-100 items-center justify-around">
                <Link to="/">
                    <div className="flex">
                        <img src="/vite.svg" alt="logo" />
                        <h1 className="text-2xl text-orange-400 font-bold">CampusBite</h1>
                    </div>
                </Link>
                <div className="flex justify-center items-center gap-10">
                    <div className="relative w-96">
                        <Search className="absolute right-3 top-3" size={18} />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none"
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default CartTop;