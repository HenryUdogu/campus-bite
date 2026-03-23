import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import MenuTop from "../components/MenuTop";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select(`
          *,
          restaurants ( name, image_url ),
          order_items (
            quantity,
            price,
            menu_items ( name )
          )
        `)
        .eq("student_id", session.user.id)
        .order("created_at", { ascending: false });

      setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    if (status === "preparing") return "bg-blue-100 text-blue-600";
    if (status === "ready") return "bg-purple-100 text-purple-600";
    if (status === "picked_up") return "bg-orange-100 text-orange-600";
    if (status === "delivered") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  if (loading) return <p className="text-gray-500 p-10">Loading...</p>;

  return (
    <div>
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="bg-orange-100 p-4 md:p-8 mx-4 my-2 md:mx-10 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
            <p className="text-gray-500 mb-4">You have no orders yet.</p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Order Now
            </button>
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
                      {order.restaurants?.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-b py-3 mb-4">
                  {order.order_items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span>{item.menu_items?.name} x{item.quantity}</span>
                      <span>₦{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-orange-400">₦{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;