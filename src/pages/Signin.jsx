import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      email,
      password
    };

    console.log(formData);

    navigate("/menu");
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-[10%] py-10 flex justify-center items-start">
      <form className="w-[70%] px-10 py-3 rounded-4xl bg-orange-100" onSubmit={handleSubmit}>
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
        <div className="w-full my-3 text-right font-semibold">
          <p>
            <a href="#" className="text-amber-950 font-bold">
              Forgotten Password
            </a>
          </p>
        </div>
        <div className="flex flex-col w-full my-2">
          <button
            type="submit"
            className="h-12 rounded-2xl font-bold text-2xl bg-amber-600"
          >
            Sign In
          </button>
        </div>
        <div class="relative flex py-5 items-center">
          <div class="grow border-t border-gray-500"></div>
          <span class="shrink mx-4 text-black">or</span>
          <div class="grow border-t border-gray-500"></div>
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
        </div>
      </form>
    </div>
  );
};

export default Signin
