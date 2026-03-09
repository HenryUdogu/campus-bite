import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Middle = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-around items-center mt-10 px-6 gap-10">
      
      <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left max-w-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Everything you crave, delivered.</h1>
          <div className="mt-4">
            <p className="text-sm sm:text-base">Your favourite local restaurants. Get a slice of pizza or the</p>
            <p className="text-sm sm:text-base">whole pie delivered, or pick up from a takeout spot</p>
            <p className="text-sm sm:text-base">you've been meaning to try.</p>
          </div>
        </div>

        <button
          className="flex bg-orange-400 rounded-2xl h-10 items-center px-4 gap-3 text-white whitespace-nowrap"
          onClick={() => navigate("/signup")}
        >
          Order Now <ArrowRight size={18} />
        </button>
      </div>

      
      <div className="mt-0 md:mt-8">
        <img
          src="/images/eat.jpeg"
          alt="food"
          className="rounded-2xl h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 object-cover"
        />
      </div>

    </div>
  );
};

export default Middle;