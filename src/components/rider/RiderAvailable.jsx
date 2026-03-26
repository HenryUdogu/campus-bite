import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const RiderAvailable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riderId, setRiderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: rider } = await supabase
        .from("riders")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (rider) {
        setRiderId(rider.id);

        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            restaurants ( name ),
            users!orders_student_id_fkey ( first_name, last_name, phone )
          `)
          .eq("status", "ready")
          .is("rider_id", null)
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setOrders(data || []);
        }
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  async function handleAccept(orderId) {
    const { error } = await supabase
      .from("orders")
      .update({ rider_id: riderId, status: "picked_up" })
      .eq("id", orderId);

    if (error) {
      setError(error.message);
      return;
    }

    setOrders(orders.filter((o) => o.id !== orderId));
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Orders</h2>

      {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <p className="text-gray-500">No available orders right now.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-lg">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Restaurant: {order.restaurants?.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Student: {order.users?.first_name} {order.users?.last_name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phone: {order.users?.phone}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Address: {order.delivery_address}
                  </p>
                </div>
                <p className="font-bold text-orange-400 text-lg">₦{order.total}</p>
              </div>

              <button
                onClick={() => handleAccept(order.id)}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-bold"
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderAvailable;