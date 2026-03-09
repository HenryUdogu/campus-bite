import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, desc }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-sm text-center flex flex-col items-center">
      <img
        src={image}
        alt={title}
        className="h-24 sm:h-28 w-full object-cover rounded-xl mb-6"
      />
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6">{desc}</p>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto mt-auto"
        onClick={() => navigate("/signup")}
      >
        Start Now
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Card;