import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Card = ({ image, title, desc }) => {
     const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-80 text-center">
      <img
        src={image}
        alt={title}
        className="h-28 mx-auto mb-6 object-contain"
      />

      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <p className="text-gray-600 mb-6">{desc}</p>

      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto " onClick={() => navigate("/signup")}>
        Start Now
        <span><ArrowRight/></span>
      </button>
    </div>
  );
};

export default Card;