const MenuCard = ({ image, name }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm w-56 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="h-32 w-full object-cover"
      />

      <div className="p-2">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-xs text-gray-500">Rating</p>
        <p className="text-xs text-gray-500">
          Free delivery on first order
        </p>
      </div>
    </div>
  );
};

export default MenuCard;