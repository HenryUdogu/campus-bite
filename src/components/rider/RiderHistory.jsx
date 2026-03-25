import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const RiderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: rider } = await supabase
        .from("riders")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (rider) {
        const { data } = await supabase
          .from("orders")
          .select(`*, restaurants ( name )`)
          .eq("rider_id", rider.id)
          .eq("status", "delivered")
          .order("created_at", { ascending: false });

        setOrders(data || []);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Delivery History</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <p className="text-gray-500">No completed deliveries yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bold">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </h3>
                <p className="text-gray-500 text-sm">{order.restaurants?.name}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-400">₦{order.total}</p>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
                  Delivered
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderHistory;