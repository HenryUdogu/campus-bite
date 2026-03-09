import MenuCard from "../components/MenuCard";
import MenuTop from "../components/MenuTop";
import { Star, ChevronDown } from "lucide-react";

const restaurants = [
  { id: 1, image: "/images/jrice.jpeg", name: "Restaurant Name" },
  { id: 2, image: "/images/sharwama.jpeg", name: "Restaurant Name" },
  { id: 3, image: "/images/spag.jpeg", name: "Restaurant Name" },
  { id: 4, image: "/images/eba.jpeg", name: "Restaurant Name" },
  { id: 5, image: "/images/wrice.jpeg", name: "Restaurant Name" },
  { id: 6, image: "/images/eba.jpeg", name: "Restaurant Name" },
  { id: 7, image: "/images/spag.jpeg", name: "Restaurant Name" },
  { id: 8, image: "/images/jrice.jpeg", name: "Restaurant Name" },
  { id: 9, image: "/images/wrice.jpeg", name: "Restaurant Name" },
  { id: 10, image: "/images/sharwama.jpeg", name: "Restaurant Name" },
];

const Menu = () => {
  return (
    <div>
      <MenuTop />

      <div className="flex flex-wrap gap-4 px-4 md:px-10 py-6 items-center">
        <h1 className="text-2xl md:text-3xl font-bold mr-4">
          Popular Near You
        </h1>

        <div className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
          Offers
        </div>

        <div className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
          <p>Over 4.5</p>
          <Star size={16} />
        </div>

        <div className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
          Under 30 mins
        </div>

        <div className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
          <p>Price</p>
          <ChevronDown size={16} />
        </div>
      </div>

      <div className="bg-orange-100 p-4 md:p-8 mx-4 md:mx-10 rounded-xl">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {restaurants.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              name={item.name}
            />
          ))}
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mt-10 mb-6">
          Most Ordered
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {restaurants.map((item) => (
            <MenuCard
              key={item.id}
              image={item.image}
              name={item.name}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Menu;