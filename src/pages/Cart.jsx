import { useState } from "react";
import CartItem from "../components/CartItem";
import CartTop from "../components/CartTop";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Beans and fried Plantain",
      price: 1500,
      quantity: 1,
      image: "/images/wrice.jpeg",
    },
    {
      id: 2,
      name: "Jollof Rice and Beef",
      price: 1500,
      quantity: 1,
      image: "/images/jrice.jpeg",
    },
  ]);

  const deliveryFee = 500;


  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee;

  return (
    <div>
      <CartTop/>
      <div className="bg-orange-100 p-6 m-10 rounded">

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
        ))}


        <input
          type="text"
          placeholder="Add a Note....."
          className="w-full p-2 rounded bg-gray-200 mb-4"
        />


        <div className="space-y-1">
          <div className="flex justify-between italic">
            <p>Subtotal</p>
            <p>#{subtotal}</p>
          </div>

          <div className="flex justify-between italic">
            <p>Delivery fee</p>
            <p>#{deliveryFee}</p>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>#{total}</p>
          </div>
        </div>

        <button className="w-full mt-6 bg-orange-600 text-black font-bold py-3 rounded" onClick={() => navigate("/checkout")}>
          PROCEED TO CHECKOUT
        </button>

      </div>
    </div>
  );
};

export default Cart;