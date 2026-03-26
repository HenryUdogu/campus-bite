import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import MenuTop from "../components/MenuTop";

const CheckOut = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  // This ref prevents the cartItems useEffect from redirecting
  // to /cart after clearCart() is called on successful payment
  const paymentSuccessful = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
        return;
      }

      const { data: userData } = await supabase
        .from("users")
        .select("first_name, last_name, email")
        .eq("id", session.user.id)
        .single();

      if (userData) {
        setUserEmail(userData.email || session.user.email);
        setUserName(`${userData.first_name} ${userData.last_name}`);
      }
    };
    checkSession();
  }, [navigate]);

  // Only redirect to cart if payment has NOT just succeeded
  useEffect(() => {
    if (cartItems.length === 0 && !paymentSuccessful.current) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  async function createOrder() {
    // Always get a fresh session inside onSuccess
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Session expired. Please sign in again.");

    const vendorId = cartItems[0].vendor_id;
    const restaurantId = cartItems[0].restaurant_id;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        student_id: session.user.id,
        vendor_id: vendorId,
        restaurant_id: restaurantId,
        total: cartTotal,
        delivery_address: deliveryAddress,
        status: "paid",
      })
      .select()
      .single();

    if (orderError) throw new Error(orderError.message);

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw new Error(itemsError.message);

    return order;
  }

  async function handlePayment() {
    if (!deliveryAddress.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    if (!window.PaystackPop) {
      setError("Payment system not loaded yet. Please wait and try again.");
      return;
    }

    setError(null);
    setLoading(true);

    const amountInKobo = cartTotal * 100;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: amountInKobo,
      currency: "NGN",
      ref: `campusbite_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: userName,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: deliveryAddress,
          },
        ],
      },

      onSuccess: async (response) => {
        try {
          await createOrder();
          // 1. Set ref to block the cartItems useEffect from redirecting to /cart
          paymentSuccessful.current = true;
          // 2. Navigate FIRST before clearing cart
          navigate("/orders", {
            state: { paymentRef: response.reference },
            replace: true,
          });
          // 3. Clear cart AFTER navigation
          clearCart();
        } catch (err) {
          setError(
            "Payment was successful but order failed. Please contact support.",
          );
          setLoading(false);
        }
      },

      onCancel: () => {
        setError("Payment was cancelled. You can try again.");
        setLoading(false);
      },
    });

    handler.openIframe();
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
          {/* Delivery Details */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter your delivery address e.g. Room 12, Block A, Hostel"
                  required
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mt-4">
              <h3 className="text-xl font-bold mb-3">Payment Method</h3>
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-semibold text-green-800 text-sm">
                    Paystack
                  </p>
                  <p className="text-green-600 text-xs">
                    Pay securely with card, bank transfer, or USSD
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
                {[
                  "Card (Visa, Mastercard, Verve)",
                  "Bank Transfer",
                  "USSD",
                ].map((method) => (
                  <div key={method} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    </div>
                    <span>{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex flex-col gap-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-2">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Subtotal</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>Delivery fee</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span className="text-orange-400">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {userEmail && (
                <p className="text-xs text-gray-400 text-center mt-3 mb-4">
                  Paying as{" "}
                  <span className="font-semibold text-gray-600">
                    {userEmail}
                  </span>
                </p>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full min-h-[48px] bg-orange-400 hover:bg-orange-500 active:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay ₦${cartTotal.toLocaleString()}`
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                disabled={loading}
                className="w-full min-h-[48px] mt-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
              >
                Back to Cart
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                🔒 Secured by Paystack
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
