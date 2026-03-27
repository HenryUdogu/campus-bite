import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import MenuTop from "../components/MenuTop";

const DELIVERY_FEE = 200;

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const PAYSTACK_SCRIPT = "https://js.paystack.co/v1/inline.js";

function loadPaystackScript() {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${PAYSTACK_SCRIPT}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = PAYSTACK_SCRIPT;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | paying | verifying | success | failed

  // Order data passed from CheckOut via navigate state
  const orderData = location.state;

  // ── Guard: redirect if no order data ──────────────────────────────────────
  useEffect(() => {
    if (!orderData) {
      navigate("/cart", { replace: true });
    }
  }, [orderData, navigate]);

  // ── Load user session & Paystack script ───────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/signin", { replace: true });
        return;
      }

      setUserEmail(session.user.email);
      const ok = await loadPaystackScript();
      setScriptReady(ok);
    };
    init();
  }, [navigate]);

  // ── Save order to Supabase after successful payment ───────────────────────
  const saveOrder = useCallback(
    async (paystackReference) => {
      setStatus("verifying");
      setLoading(true);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const { cartItems, cartTotal, deliveryAddress } = orderData;
        const grandTotal = cartTotal + DELIVERY_FEE;
        const vendorId = cartItems[0].vendor_id;
        const restaurantId = cartItems[0].restaurant_id;

        // Create order
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            student_id: session.user.id,
            vendor_id: vendorId,
            restaurant_id: restaurantId,
            total: grandTotal,
            delivery_address: deliveryAddress,
            status: "pending",
          })
          .select()
          .single();

        if (orderError) throw new Error(orderError.message);

        // Create order items
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

        setStatus("success");
        clearCart();
        setTimeout(() => {
          navigate("/orders");
        }, 1800);
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    },
    [orderData, navigate],
  );

  // ── Launch Paystack popup ─────────────────────────────────────────────────
  const handlePayNow = useCallback(() => {
    if (!scriptReady || !window.PaystackPop) {
      setError("Payment system failed to load. Please refresh and try again.");
      return;
    }

    setStatus("paying");
    setError(null);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: (orderData.cartTotal + DELIVERY_FEE) * 100, // Paystack uses kobo
      currency: "NGN",
      ref: `order_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: orderData.deliveryAddress,
          },
        ],
      },
      callback: (response) => {
        saveOrder(response.reference);
      },
      onClose: () => {
        if (status === "paying") {
          setStatus("idle");
        }
      },
    });

    handler.openIframe();
  }, [scriptReady, userEmail, orderData, saveOrder, status]);

  if (!orderData) return null;

  const { cartItems, cartTotal, deliveryAddress } = orderData;
  const grandTotal = cartTotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-3">
            <svg
              className="w-7 h-7 text-orange-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your order and complete payment
          </p>
        </div>

        {/* Status overlay messages */}
        {status === "verifying" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span className="text-blue-700 font-medium text-sm">
              Confirming your payment, please wait…
            </span>
          </div>
        )}

        {status === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-green-700 font-medium text-sm">
              Payment successful! Redirecting to your orders…
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Order summary card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
              Order Summary
            </h2>
          </div>
          <div className="px-6 py-4 flex flex-col gap-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name}{" "}
                  <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-gray-800">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t pt-3 mt-1">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-700">
                ₦{cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="text-gray-700">
                ₦{DELIVERY_FEE.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="px-6 py-4 bg-orange-50 flex justify-between items-center">
            <span className="font-bold text-gray-700">Total</span>
            <span className="font-bold text-lg text-orange-500">
              ₦{grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Delivery address card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
              Delivery Address
            </h2>
          </div>
          <div className="px-6 py-4 flex items-start gap-3">
            <svg
              className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-600 text-sm leading-relaxed">
              {deliveryAddress}
            </p>
          </div>
        </div>

        {/* Payment info note */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secured by Paystack · Your payment info is encrypted
        </div>

        {/* Action buttons */}
        <button
          onClick={handlePayNow}
          disabled={
            loading ||
            status === "success" ||
            status === "verifying" ||
            !scriptReady
          }
          className="w-full min-h-[52px] bg-orange-400 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base transition-colors mb-3 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Pay ₦{grandTotal.toLocaleString()} with Paystack
            </>
          )}
        </button>

        <button
          onClick={() =>
            navigate("/checkout", { state: { restore: orderData } })
          }
          disabled={loading || status === "verifying" || status === "success"}
          className="w-full min-h-[48px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
        >
          ← Back to Checkout
        </button>
      </div>
    </div>
  );
};

export default Payment;
