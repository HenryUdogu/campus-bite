import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

const RiderSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");
  const [ninNo, setNinNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: `${firstName} ${lastName}`,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    const { error: userError } = await supabase.from("users").insert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      role: "rider",
    });

    if (userError) {
      setError(userError.message);
      setLoading(false);
      return;
    }

    const { error: riderError } = await supabase.from("riders").insert({
      user_id: data.user.id,
      vehicle_type: vehicleType,
      nin_no: ninNo,
      license_no: licenseNo,
      plate_number: plateNumber,
    });

    if (riderError) {
      setError(riderError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/signin");
  }

  return (
    <div className="min-h-screen px-4 md:px-[10%] py-10 flex justify-center items-start">
      <form
        className="w-full md:w-[70%] lg:w-[55%] px-4 md:px-10 py-6 rounded-3xl bg-orange-100"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold">Rider Sign Up</h1>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-semibold mb-4 text-center">
            {error}
          </p>
        )}


        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
              placeholder="Enter your First Name"
              required
            />
          </div>
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
              placeholder="Enter your Last Name"
              required
            />
          </div>
        </div>


        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            placeholder="Enter your Email"
            required
          />
        </div>


        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">
            Mobile Number
          </label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            placeholder="Enter your Phone Number"
            required
          />
        </div>


        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            required
          >
            <option value="bike">Bike</option>
            <option value="motorbike">Motorbike</option>
            <option value="car">Car</option>
          </select>
        </div>


        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">
              NIN Number
            </label>
            <input
              type="text"
              value={ninNo}
              onChange={(e) => setNinNo(e.target.value)}
              className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
              placeholder="Enter your NIN"
              required
            />
          </div>
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">
              License Number
            </label>
            <input
              type="text"
              value={licenseNo}
              onChange={(e) => setLicenseNo(e.target.value)}
              className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
              placeholder="Enter your License No"
              required
            />
          </div>
        </div>


        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">
            Plate Number
          </label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            placeholder="Enter your Plate Number"
            required
          />
        </div>


        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            placeholder="Enter your Password"
            required
          />
        </div>

        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 border border-orange-300 rounded-2xl px-4 bg-white"
            placeholder="Confirm Your Password"
            required
          />
        </div>

        <div className="w-full my-3 font-semibold text-sm md:text-base">
          <p>
            By tapping "Sign Up" you agree to CampusBite{" "}
            <a href="#" className="text-orange-600">
              Terms and Condition
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col w-full my-2">
          <button
            type="submit"
            disabled={loading}
            className="min-h-[48px] rounded-2xl font-bold text-xl md:text-2xl bg-amber-600 text-white"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        <div className="w-full my-2 text-right font-semibold text-sm md:text-base">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold">
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RiderSignup;
