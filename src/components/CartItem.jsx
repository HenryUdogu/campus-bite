const CartItem = ({ item, increaseQty, decreaseQty, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">

      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded object-cover"
        />

        <div>
          <h3 className="font-semibold text-sm md:text-base">
            {item.name}
          </h3>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => decreaseQty(item.id)}
              className="bg-red-200 px-3 py-1 rounded"
            >
              -
            </button>

            <div className="bg-gray-200 px-4 py-1 rounded">
              {item.quantity}
            </div>

            <button
              onClick={() => increaseQty(item.id)}
              className="bg-green-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex sm:block justify-between sm:text-right items-center">
        <p className="font-semibold text-sm md:text-base">
          #{item.price * item.quantity}
        </p>

        <button
          onClick={() => removeItem(item.id)}
          className="text-sm sm:mt-6"
        >
          Remove
        </button>
      </div>

    </div>
  );
};

export default CartItem;