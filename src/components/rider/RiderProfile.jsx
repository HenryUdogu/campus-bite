import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const RiderProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [ninNo, setNinNo] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
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

      const { data: rider } = await supabase
        .from("riders")
        .select("vehicle_type, license_no, nin_no, plate_number")
        .eq("user_id", session.user.id)
        .single();

      if (rider) {
        setVehicleType(rider.vehicle_type);
        setLicenseNo(rider.license_no);
        setNinNo(rider.nin_no);
        setPlateNumber(rider.plate_number);
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

    const { error: userError } = await supabase
      .from("users")
      .update({ first_name: firstName, last_name: lastName, phone })
      .eq("id", session.user.id);

    if (userError) {
      setError(userError.message);
      setSaving(false);
      return;
    }

    const { error: riderError } = await supabase
      .from("riders")
      .update({ vehicle_type: vehicleType, license_no: licenseNo, nin_no: ninNo, plate_number: plateNumber })
      .eq("user_id", session.user.id);

    if (riderError) {
      setError(riderError.message);
      setSaving(false);
      return;
    }

    setSuccess("Profile updated successfully!");
    setSaving(false);
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm font-semibold mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 border border-gray-300 rounded-xl px-4"
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
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4 bg-white"
          >
            <option value="bike">Bike</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="car">Car</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">License Number</label>
          <input
            type="text"
            value={licenseNo}
            onChange={(e) => setLicenseNo(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">NIN Number</label>
          <input
            type="text"
            value={ninNo}
            onChange={(e) => setNinNo(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Plate Number</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
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

export default RiderProfile;