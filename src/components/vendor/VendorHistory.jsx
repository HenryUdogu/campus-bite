import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const VendorHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        const { data } = await supabase
          .from("orders")
          .select(`
            *,
            restaurants ( name ),
            users!orders_student_id_fkey ( first_name, last_name ),
            order_items (
              quantity,
              price,
              menu_items ( name )
            )
          `)
          .eq("vendor_id", vendor.id)
          .eq("status", "delivered")
          .order("created_at", { ascending: false });

        setOrders(data || []);

        const revenue = (data || []).reduce(
          (sum, order) => sum + order.total, 0
        );
        setTotalRevenue(revenue);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">{orders.length}</h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">₦{totalRevenue}</h3>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <p className="text-gray-500">No completed orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {order.users?.first_name} {order.users?.last_name}
                  </p>
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

              <div className="border-t pt-3">
                {order.order_items?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm py-1">
                    <span>{item.menu_items?.name} x{item.quantity}</span>
                    <span>₦{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorHistory;