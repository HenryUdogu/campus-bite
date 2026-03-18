import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const DashboardHome = () => {
  const [vendorName, setVendorName] = useState("");
  const [totalMenuItems, setTotalMenuItems] = useState(0);
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
        setVendorName(`${profile.first_name} ${profile.last_name}`);
      }

      
      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        
        const { count } = await supabase
          .from("menu_items")
          .select("*", { count: "exact", head: true })
          .eq("vendor_id", vendor.id);

        setTotalMenuItems(count || 0);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-2 px-5">Welcome, {vendorName} </h2>
      <p className="text-gray-500 mb-8 px-5">
        Here's what's happening with your store today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Menu Items</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">
            {totalMenuItems}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Pending Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">0</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Completed Orders</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">0</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-3xl font-bold text-orange-400 mt-2">₦0</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;