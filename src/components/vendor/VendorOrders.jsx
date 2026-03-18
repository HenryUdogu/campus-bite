import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            order_items (
              quantity,
              price,
              menu_item_id,
              menu_items (
                name
              )
            ),
            users (
              first_name,
              last_name
            )
          `)
          .eq("vendor_id", vendor.id)
          .neq("status", "delivered")
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

  async function updateStatus(orderId, newStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      setError(error.message);
      return;
    }

    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  }

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "pending") return "preparing";
    if (currentStatus === "preparing") return "ready";
    return null;
  };

  const getNextStatusLabel = (currentStatus) => {
    if (currentStatus === "pending") return "Mark as Preparing";
    if (currentStatus === "preparing") return "Mark as Ready";
    return null;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 px-5">Orders</h2>

      {error && (
        <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 md:px-5">
        {["pending", "preparing", "ready"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-semibold capitalize transition
              ${
                activeTab === tab
                  ? "bg-orange-400 text-white"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
          >
            {tab}
            <span className="ml-2 text-sm">
              ({orders.filter((o) => o.status === tab).length})
            </span>
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center md:px-5">
          <p className="text-gray-500">No {activeTab} orders.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4  md:px-5">
          {filteredOrders.map((order) => (
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
                    {formatTime(order.created_at)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize
                  ${order.status === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
                  ${order.status === "preparing" ? "bg-blue-100 text-blue-600" : ""}
                  ${order.status === "ready" ? "bg-green-100 text-green-600" : ""}
                `}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="border-t border-b py-3 mb-4">
                {order.order_items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm py-1"
                  >
                    <span>
                      {item.menu_items?.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₦{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">Total: ₦{order.total}</p>
                {getNextStatus(order.status) && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, getNextStatus(order.status))
                    }
                    className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold text-sm"
                  >
                    {getNextStatusLabel(order.status)}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorOrders;