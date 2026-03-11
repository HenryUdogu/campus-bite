import MenuCard from "../components/MenuCard";
import MenuTop from "../components/MenuTop";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { LogOut } from "lucide-react";

const restaurants = [
  { id: 1, image: "/images/jrice.jpeg", name: "Restaurant Name" },
  { id: 2, image: "/images/sharwama.jpeg", name: "Restaurant Name" },
  { id: 3, image: "/images/spag.jpeg", name: "Restaurant Name" },
  { id: 4, image: "/images/eba.jpeg", name: "Restaurant Name" },
  { id: 5, image: "/images/wrice.jpeg", name: "Restaurant Name" },
  { id: 6, image: "/images/eba.jpeg", name: "Restaurant Name" },
  { id: 7, image: "/images/spag.jpeg", name: "Restaurant Name" },
  { id: 8, image: "/images/jrice.jpeg", name: "Restaurant Name" },
  { id: 9, image: "/images/wrice.jpeg", name: "Restaurant Name" },
  { id: 10, image: "/images/sharwama.jpeg", name: "Restaurant Name" },
];

const Menu = () => {
  const navigate = useNavigate();

  // Block unauthenticated access
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/signin", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <div>
      <MenuTop />

      {/* Logout Button */}
      <div className="flex justify-end px-4 md:px-10 mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="bg-orange-100 p-4 md:p-8 mx-4 md:mx-10 rounded-xl">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {restaurants.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              name={item.name}
            />
          ))}
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mt-10 mb-6">
          Most Ordered
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {restaurants.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              name={item.name}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Menu;