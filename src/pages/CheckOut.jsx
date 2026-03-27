import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import MenuTop from "../components/MenuTop";

const DELIVERY_FEE = 200;

const CheckOut = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Restore delivery address if user navigated back from Payment ──────────
  useEffect(() => {
    if (location.state?.restore?.deliveryAddress) {
      setDeliveryAddress(location.state.restore.deliveryAddress);
    }
  }, [location.state]);

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  // ── Redirect to cart if empty ─────────────────────────────────────────────
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // ── Validate then hand off to Payment page ────────────────────────────────
  function handlePlaceOrder() {
    if (!deliveryAddress.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setError(null);

    navigate("/payment", {
      state: {
        cartItems,
        cartTotal,
        deliveryAddress: deliveryAddress.trim(),
      },
    });
  }

  return (
    <div>
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="bg-orange-100 p-4 md:p-8 mx-4 my-2 md:mx-10 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h2>

        {error && (
          <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Delivery Details</h3>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 h-28 resize-none"
                  placeholder="Enter your delivery address e.g. Room 12, Block A, Hostel"
                  required
                />
              </div>
            </div>
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex flex-col gap-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₦{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>₦{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>₦{DELIVERY_FEE}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-orange-400">
                    ₦{cartTotal + DELIVERY_FEE}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
              >
                Place Order
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full min-h-[48px] mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
