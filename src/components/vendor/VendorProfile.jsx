import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const VendorProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [cacId, setCacId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("users")
        .select("first_name, last_name, email, phone")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email);
        setPhone(profile.phone);
      }

      const { data: vendor } = await supabase
        .from("vendors")
        .select("shop_name, cac_id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        setShopName(vendor.shop_name);
        setCacId(vendor.cac_id);
      }

      setLoading(false);
    };
    fetchProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    const { data: { session } } = await supabase.auth.getSession();

    // Update users table
    const { error: userError } = await supabase
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone,
      })
      .eq("id", session.user.id);

    if (userError) {
      setError(userError.message);
      setSaving(false);
      return;
    }

    // Update vendors table
    const { error: vendorError } = await supabase
      .from("vendors")
      .update({
        shop_name: shopName,
        cac_id: cacId,
      })
      .eq("user_id", session.user.id);

    if (vendorError) {
      setError(vendorError.message);
      setSaving(false);
      return;
    }

    setSuccess("Profile updated successfully!");
    setSaving(false);
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm font-semibold mb-4">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 border border-gray-300 rounded-xl px-4"
              placeholder="First Name"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 border border-gray-300 rounded-xl px-4"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            value={email}
            className="h-12 border border-gray-300 rounded-xl px-4 bg-gray-100 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-gray-400">Email cannot be changed</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            placeholder="Shop Name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">CAC ID</label>
          <input
            type="text"
            value={cacId}
            onChange={(e) => setCacId(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            placeholder="CAC ID"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default VendorProfile;