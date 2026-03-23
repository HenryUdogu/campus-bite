import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import MenuTop from "../components/MenuTop";
import { useState } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (cartItems.length === 0) {
    return (
      <div>
        <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-bold text-gray-500">Your cart is empty</h2>
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="bg-orange-100 p-4 md:p-8 mx-4 my-2 md:mx-10 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Your Cart</h2>
          <button
            onClick={clearCart}
            className="text-red-500 font-semibold hover:underline text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-orange-400 font-semibold">₦{item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="font-bold text-right w-20">
                  ₦{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex flex-col gap-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₦{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-400">₦{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="w-full min-h-[48px] mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;