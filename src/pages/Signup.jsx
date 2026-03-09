import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
          first_name: firstName,
          last_name: lastName,
          phone,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    // Save to users table
    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    });

    if (insertError) {
      setError(insertError.message);
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
          <h1 className="text-2xl md:text-3xl font-bold">Customer Form</h1>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-semibold mb-4 text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 border border-black rounded-2xl px-4"
              placeholder="Enter your First name"
              required
            />
          </div>
          <div className="flex flex-col w-full my-2">
            <label className="font-semibold text-lg md:text-[20px]">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 border border-black rounded-2xl px-4"
              placeholder="Enter your Last name"
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
            className="h-12 border border-black rounded-2xl px-4"
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">Mobile Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 border border-black rounded-2xl px-4"
            placeholder="Enter your Phone Number"
            required
          />
        </div>

        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border border-black rounded-2xl px-4"
            placeholder="Enter your Password"
            required
          />
        </div>

        <div className="flex flex-col w-full my-2">
          <label className="font-semibold text-lg md:text-[20px]">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 border border-black rounded-2xl px-4"
            placeholder="Confirm Your Password"
            required
          />
        </div>

        <div className="w-full my-3 font-semibold text-sm md:text-base">
          <p>
            By tapping "Sign Up" you agree to CampusBite{" "}
            <a href="#" className="text-orange-600">Terms and Condition</a>.
            We may text you a verification code. Msg & data rates apply.
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

        <div className="relative flex py-5 items-center">
          <div className="grow border-t border-gray-500"></div>
          <span className="mx-4 text-black">or</span>
          <div className="grow border-t border-gray-500"></div>
        </div>

        <div className="flex flex-col w-full my-2">
          <button
            type="button"
            className="w-full min-h-[48px] border border-black rounded-2xl font-bold text-sm sm:text-base md:text-lg bg-white flex justify-center items-center gap-2 sm:gap-3 px-4 py-2"
          >
            <img src="/google.svg" alt="Google logo" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="flex flex-col w-full my-2">
          <button
            type="button"
            className="w-full min-h-[48px] border border-black rounded-2xl font-bold text-sm sm:text-base md:text-lg bg-white flex justify-center items-center gap-2 sm:gap-3 px-4 py-2"
          >
            <img src="/apple.svg" alt="Apple logo" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="w-full my-2 text-right font-semibold text-sm md:text-base">
          <p>
            Already have an account{" "}
            <Link to="/signin" className="text-orange-500 font-semibold">Login Here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;