const MenuCard = ({ image, name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-gray-400 text-xs">Tap to see menu</p>
      </div>
    </div>
  );
};

export default MenuCard;