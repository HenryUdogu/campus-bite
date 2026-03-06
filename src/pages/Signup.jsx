import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    };

    console.log(formData);

    navigate("/signin");
  }
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen px-[10%] py-10 flex justify-center items-start">

        <form className="w-[70%] px-10 py-3 rounded-4xl bg-orange-100" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center m-3"><h1 className="text-3xl font-bold">Customer Form</h1></div>
          <div className="w-full flex gap-5">
            <div className="flex flex-col w-[50%] my-2">
              <label className="font-semibold text-[20px]">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 border border-black rounded-2xl px-4"
                placeholder="Enter your First name"
                required
              />
            </div>
            <div className="flex flex-col w-[50%] my-2">
              <label className="font-semibold text-[20px]">Last Name</label>
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
            <label className="font-semibold text-[20px]">Email</label>
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
            <label className="font-semibold text-[20px]">Mobile Number</label>
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
            <label className="font-semibold text-[20px]">Password</label>
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
            <label className="font-semibold text-[20px]">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 border border-black rounded-2xl px-4"
              placeholder="Confirm Your Password"
              required 
            />
          </div>
          <div className="w-full my-3 font-semibold">
            <p>
              By tapping "Sign Up" you agree to CampusBite{" "}
              <a href="#">Terms and Condition</a>. We may text you a verification
              code. Msg & data rates apply.
            </p>
          </div>
          <div className="flex flex-col w-full my-2">
            <button
              type="submit"
              className="h-12 rounded-2xl font-bold text-2xl bg-amber-600"
              
            >
              Sign Up
            </button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className=" grow border-t border-gray-500"></div>
            <span className=" shrink mx-4 text-black">or</span>
            <div className="grow border-t border-gray-500"></div>
          </div>
          <div className="flex flex-col w-full my-2">
            <button
              type="text"
              className="h-12 border border-black rounded-2xl font-bold text-2xl bg-white flex justify-center items-center gap-5"
            >
              <img src="/google.svg" alt="Google logo" />
              Continue with Google
            </button>
          </div>
          <div className="flex flex-col w-full my-2">
            <button
              type="text"
              className="h-12 border border-black rounded-2xl font-bold text-2xl bg-white flex justify-center items-center gap-5"
            >
              <img src="/apple.svg" alt="Apple logo" className="size-9" />
              Continue with Apple
            </button>
          </div>
          <div className="w-full my-2 text-right font-semibold">
            <p>
              Already have an account{" "}
              <Link to="/signin" className="text-orange-500 font-semibold">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;