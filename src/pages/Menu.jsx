import MenuCard from "../components/MenuCard";
import MenuTop from "../components/MenuTop";
import { Star, ChevronDown } from "lucide-react";

const restaurants = [
    { id: 1, image: "/images/jrice.jpeg", name: "Resturant Name" },
    { id: 2, image: "/images/sharwama.jpeg", name: "Resturant Name" },
    { id: 3, image: "/images/spag.jpeg", name: "Resturant Name" },
    { id: 4, image: "/images/eba.jpeg", name: "Resturant Name" },
    { id: 5, image: "/images/wrice.jpeg", name: "Resturant Name" },
    { id: 6, image: "/images/eba.jpeg", name: "Resturant Name" },
    { id: 7, image: "/images/spag.jpeg", name: "Resturant Name" },
    { id: 8, image: "/images/jrice.jpeg", name: "Resturant Name" },
    { id: 9, image: "/images/wrice.jpeg", name: "Resturant Name" },
    { id: 10, image: "/images/sharwama.jpeg", name: "Resturant Name" },
];

const Menu = () => {
    return (
        <div>
            <MenuTop />
            <div className="flex flex-row gap-10 m-10">
                <h1 className="text-3xl font-bold">Popular Near You</h1>
                <div className="h-fit w-fit bg-gray-400 p-2 rounded-xl">
                    <p>Offers</p>
                </div>
                <div className="h-fit w-fit bg-gray-400 p-2 flex items-center gap-1.5 rounded-xl">
                    <p>Over 4.5</p>
                    <Star/>
                </div>
                <div className="h-fit w-fit bg-gray-400 p-2 rounded-xl">
                    <p>Under 30 mins</p>
                </div>
                <div className="h-fit w-fit bg-gray-400 p-2 flex items-center gap-1.5 rounded-xl">
                    <p>Price</p>
                    <ChevronDown />
                </div>
            </div>
            <div className="bg-orange-100 p-8 m-10">
                <div className="grid grid-cols-5 gap-6">
                    {restaurants.map((item) => (
                        <MenuCard
                            key={item.id}
                            image={item.image}
                            name={item.name}
                        />
                    ))}
                </div>


                <h2 className="text-4xl font-bold mt-10 mb-6">
                    Most Ordered
                </h2>


                <div className="grid grid-cols-5 gap-6">
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