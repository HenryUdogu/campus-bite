const MenuCard = ({ image, name }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full hover:shadow-md transition">

      <img
        src={image}
        alt={name}
        className="h-32 md:h-36 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold text-sm md:text-base">
          {name}
        </h3>

        <p className="text-xs md:text-sm text-gray-500">
          Rating
        </p>

        <p className="text-xs md:text-sm text-gray-500">
          Free delivery on first order
        </p>
      </div>

    </div>
  );
};

export default MenuCard;