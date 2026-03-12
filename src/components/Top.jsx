import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col-reverse md:flex-row justify-around mt-7 px-6 gap-10 items-center">
      
      
      <div className="flex flex-col gap-6 md:gap-10 items-center md:items-start text-center md:text-left max-w-md">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">You Crave it</h1>
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400">We Deliver.</h1>
          <div className="mt-3">
            <p className="text-black text-sm sm:text-base">From hostels to lecture hall discover meals you love from</p>
            <p className="text-black text-sm sm:text-base">your favourite campus vendors and enjoy fast stress-</p>
            <p className="text-black text-sm sm:text-base">free delivery right to you.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex bg-orange-400 rounded-2xl h-10 items-center px-4 gap-3 text-white whitespace-nowrap"
            onClick={() => navigate("/signin")}
          >
            Deliver with Us <ArrowRight size={18} />
          </button>
          <button
            className="flex bg-white rounded-2xl h-10 items-center px-4 gap-3 border border-amber-500 text-orange-400 whitespace-nowrap"
            onClick={() => navigate("/signin")}
          >
            Become a Vendor <ArrowRight size={18} />
          </button>
        </div>
      </div>

      
      <div className="flex flex-col gap-3 mt-9">
        <div className="flex flex-row gap-3">
          <img src="/images/drink.jpeg"   alt="drink"   className="h-32 w-32 sm:h-40 sm:w-40 rounded-tl-[120px] rounded-[15px] object-cover" />
          <img src="/images/sharwama.jpeg" alt="shawarma" className="h-32 w-32 sm:h-40 sm:w-40 rounded-tr-[120px] rounded-[15px] object-cover" />
        </div>
        <div className="flex flex-row gap-3">
          <img src="/images/spag.jpeg"  alt="spaghetti"  className="h-32 w-32 sm:h-40 sm:w-40 rounded-bl-[120px] rounded-[15px] object-cover" />
          <img src="/images/wrice.jpeg" alt="white rice"  className="h-32 w-32 sm:h-40 sm:w-40 rounded-br-[120px] rounded-[15px] object-cover" />
        </div>
      </div>

    </div>
  );
};

export default Top;