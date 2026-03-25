import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const RiderDashboardHome = () => {
  const [riderName, setRiderName] = useState("");
  const [riderId, setRiderId] = useState(null);
  const [completedToday, setCompletedToday] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [activeOrder, setActiveOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("users")
        .select("first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setRiderName(`${profile.first_name} ${profile.last_name}`);
      }

      const { data: rider } = await supabase
        .from("riders")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (rider) {
        setRiderId(rider.id);

        const today = new Date().toISOString().split("T")[0];

        const { count: todayCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("rider_id", rider.id)
          .eq("status", "delivered")
          .gte("created_at", `${today}T00:00:00`)
          .lte("created_at", `${today}T23:59:59`);

        setCompletedToday(todayCount || 0);

        const { count: totalCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("rider_id", rider.id)
          .eq("status", "delivered");

        setTotalDeliveries(totalCount || 0);

        const { data: active } = await supabase
          .from("orders")
          .select(`*, restaurants ( name )`)
          .eq("rider_id", rider.id)
          .eq("status", "picked_up")
          .single();

        setActiveOrder(active);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Welcome, {riderName} 👋</h2>
      <p className="text-gray-500 mb-8">Here's your delivery overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Completed Today</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">{completedToday}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Deliveries</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">{totalDeliveries}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Status</p>
          <h3 className="text-lg font-bold text-green-500 mt-2">
            {activeOrder ? "On Delivery 🛵" : "Available ✅"}
          </h3>
        </div>
      </div>

      {activeOrder && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Current Delivery</h3>
          <p className="text-gray-500">Order #{activeOrder.id.slice(0, 8).toUpperCase()}</p>
          <p className="text-gray-500">Restaurant: {activeOrder.restaurants?.name}</p>
          <p className="text-gray-500">Address: {activeOrder.delivery_address}</p>
          <p className="font-bold text-orange-400 mt-2">Total: ₦{activeOrder.total}</p>
        </div>
      )}
    </div>
  );
};

export default RiderDashboardHome;