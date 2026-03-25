import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const DashboardHome = () => {
  const [vendorName, setVendorName] = useState("");
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [preparingOrders, setPreparingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      // Fetch vendor name
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("first_name, last_name")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
      }

      if (profile) {
        setVendorName(`${profile.first_name} ${profile.last_name}`);
      }

      // Fetch vendor record
      const { data: vendor, error: vendorError } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendorError || !vendor) {
        console.error("Vendor error:", vendorError);
        setLoading(false);
        return;
      }

      // Total menu items
      const { count: menuCount, error: menuError } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true })
        .eq("vendor_id", vendor.id);

      if (menuError) {
        console.error("Menu items error:", menuError);
      }

      setTotalMenuItems(menuCount || 0);

      // Fetch vendor orders
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("id, status, total")
        .eq("vendor_id", vendor.id);

      if (ordersError) {
        console.error("Orders error:", ordersError);
      }

      if (orders) {
        const pending = orders.filter(
          (order) => order.status?.toLowerCase() === "pending"
        ).length;

        const preparing = orders.filter(
          (order) => order.status?.toLowerCase() === "preparing"
        ).length;

        const completed = orders.filter(
          (order) => order.status?.toLowerCase() === "completed"
        ).length;

        const revenue = orders
          .filter((order) => order.status?.toLowerCase() === "completed")
          .reduce((sum, order) => sum + (Number(order.total) || 0), 0);

        setPendingOrders(pending);
        setPreparingOrders(preparing);
        setCompletedOrders(completed);
        setTotalRevenue(revenue);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500 px-5">Loading...</p>;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-2 px-5">Welcome, {vendorName}</h2>
      <p className="text-gray-500 mb-8 px-5">
        Here's what's happening with your store today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:px-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Menu Items</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            {totalMenuItems}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Pending Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            {pendingOrders}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Preparing Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            {preparingOrders}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Completed Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            {completedOrders}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            ₦{totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;