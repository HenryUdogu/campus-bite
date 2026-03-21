import MenuCard from "../components/MenuCard";
import MenuTop from "../components/MenuTop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Menu = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentName, setStudentName] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setStudentName(`${profile.first_name} ${profile.last_name}`);
      }

      const { data: restaurantData } = await supabase
        .from("restaurants")
        .select("*")
        .order("created_at", { ascending: false });

      setRestaurants(restaurantData || []);
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/signin", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 p-10">Loading...</p>;

  return (
    <div>
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="bg-orange-100 p-4 md:p-8 mx-4 my-2 md:mx-10 rounded-xl">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Welcome, {studentName} 👋
        </h2>

        <h3 className="text-xl md:text-2xl font-bold mb-4">Browse Restaurants</h3>

        {filteredRestaurants.length === 0 ? (
          <p className="text-gray-500 mb-8">
            {searchQuery ? `No restaurants found for "${searchQuery}"` : "No restaurants available yet."}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
            {filteredRestaurants.map((restaurant) => (
              <MenuCard
                key={restaurant.id}
                image={restaurant.image_url}
                name={restaurant.name}
                onClick={() => navigate(`/menu/${restaurant.id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;