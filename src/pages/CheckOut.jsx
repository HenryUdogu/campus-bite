import { useState, useEffect } from "react";
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

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin", { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  async function handlePlaceOrder() {
    if (!deliveryAddress) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();

    // Get student id
    const { data: student } = await supabase
      .from("users")
      .select("id")
      .eq("id", session.user.id)
      .single();

    // Get vendor id from first cart item
    const vendorId = cartItems[0].vendor_id;

    // Get restaurant id from first cart item
    const restaurantId = cartItems[0].restaurant_id;

    // Step 1 - Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        student_id: student.id,
        vendor_id: vendorId,
        restaurant_id: restaurantId,
        total: cartTotal,
        delivery_address: deliveryAddress,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      setError(orderError.message);
      setLoading(false);
      return;
    }

    // Step 2 - Create order items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      setError(itemsError.message);
      setLoading(false);
      return;
    }

    clearCart();
    setLoading(false);
    navigate("/orders");
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
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
              >
                {loading ? "Placing Order..." : "Place Order"}
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