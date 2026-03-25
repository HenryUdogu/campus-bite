import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const RiderActive = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActive = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: rider } = await supabase
        .from("riders")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (rider) {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            restaurants ( name, image_url ),
            users ( first_name, last_name ),
            order_items (
              quantity,
              price,
              menu_items ( name )
            )
          `)
          .eq("rider_id", rider.id)
          .eq("status", "picked_up")
          .single();

        if (error && error.code !== "PGRST116") {
          setError(error.message);
        } else {
          setOrder(data);
        }
      }
      setLoading(false);
    };
    fetchActive();
  }, []);

  async function handleDelivered() {
    const { error } = await supabase
      .from("orders")
      .update({ status: "delivered" })
      .eq("id", order.id);

    if (error) {
      setError(error.message);
      return;
    }

    setOrder(null);
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Active Delivery</h2>

      {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}

      {!order ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <p className="text-gray-500">No active delivery right now.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            {order.restaurants?.image_url && (
              <img
                src={order.restaurants.image_url}
                alt={order.restaurants.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div>
              <h3 className="font-bold text-xl">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h3>
              <p className="text-gray-500">{order.restaurants?.name}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Student</span>
              <span className="font-semibold">
                {order.users?.first_name} {order.users?.last_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Address</span>
              <span className="font-semibold">{order.delivery_address}</span>
            </div>
          </div>

          <div className="border-t border-b py-4 mb-6">
            {order.order_items?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm py-1">
                <span>{item.menu_items?.name} x{item.quantity}</span>
                <span>₦{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span className="text-orange-400">₦{order.total}</span>
          </div>

          <button
            onClick={handleDelivered}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-lg"
          >
            Mark as Delivered ✓
          </button>
        </div>
      )}
    </div>
  );
};

export default RiderActive;