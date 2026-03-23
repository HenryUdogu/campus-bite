import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import MenuTop from "../components/MenuTop";
import { useCart } from "../context/CartContext";
import {ArrowLeft} from "lucide-react"

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
        return;
      }

      const { data: restaurantData } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      setRestaurant(restaurantData);

      const { data: menuData } = await supabase
        .from("menu_items")
        .select("*")
        .eq("restaurant_id", id)
        .eq("available", true)
        .order("created_at", { ascending: false });

      setMenuItems(menuData || []);
      setLoading(false);
    };
    fetchData();
  }, [id, navigate]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      restaurant_id: item.restaurant_id,
      vendor_id: item.vendor_id,
    });
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 p-10">Loading...</p>;

  return (
    <div>
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="bg-orange-100 p-4 md:p-8 mx-4 my-2 md:mx-10 rounded-xl">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/menu")}
            className="text-orange-400 font-semibold hover:underline"
          >
            <ArrowLeft/> Back
          </button>
          {restaurant?.image_url && (
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{restaurant?.name}</h2>
            {restaurant?.description && (
              <p className="text-gray-500 text-sm">{restaurant.description}</p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Menu</h3>

        {filteredItems.length === 0 ? (
          <p className="text-gray-500">
            {searchQuery ? `No items found for "${searchQuery}"` : "No menu items available yet."}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-orange-400 font-bold text-sm">₦{item.price}</p>
                  {item.description && (
                    <p className="text-gray-400 text-xs mt-1">{item.description}</p>
                  )}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full mt-3 py-2 rounded-xl text-sm font-semibold transition
                      ${addedItems[item.id]
                        ? "bg-green-500 text-white"
                        : "bg-orange-400 hover:bg-orange-500 text-white"
                      }`}
                  >
                    {addedItems[item.id] ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;