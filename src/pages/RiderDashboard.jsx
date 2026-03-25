import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import RiderSideBar from "../components/rider/RiderSideBar";
import { Menu, X } from "lucide-react";

const RiderDashboard = () => {
  const [riderName, setRiderName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
        setRiderName(`${profile.first_name} ${profile.last_name}`);
      }
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <RiderSideBar setSidebarOpen={setSidebarOpen} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <h2 className="text-lg font-semibold text-gray-700">Rider Dashboard</h2>
          <p className="text-sm text-gray-500 hidden md:block">{riderName}</p>
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RiderDashboard;