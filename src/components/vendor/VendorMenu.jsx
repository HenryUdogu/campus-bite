import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Trash2, Pencil } from "lucide-react";

const VendorMenu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        setVendorId(vendor.id);

        const { data: restaurant } = await supabase
          .from("restaurants")
          .select("id")
          .eq("vendor_id", vendor.id)
          .single();

        if (restaurant) {
          setRestaurantId(restaurant.id);
          fetchMenuItems(vendor.id);
        } else {
          setError("Please set up your restaurant first before adding menu items.");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const fetchMenuItems = async (vId) => {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .eq("vendor_id", vId)
      .order("created_at", { ascending: false });

    setMenuItems(data || []);
    setLoading(false);
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description || "");
    setImagePreview(item.image_url);
    setShowForm(true);
  }

  function resetForm() {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowForm(false);
    setError(null);
    setSuccess(null);
  }

  async function handleDelete(itemId) {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      setError(error.message);
      return;
    }

    setMenuItems(menuItems.filter((item) => item.id !== itemId));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    let imageUrl = editingItem?.image_url || null;

    if (image) {
      const fileName = `${vendorId}-${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(fileName, image);

      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    if (editingItem) {
      const { error: updateError } = await supabase
        .from("menu_items")
        .update({ name, price, description, image_url: imageUrl })
        .eq("id", editingItem.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setMenuItems(menuItems.map((item) =>
        item.id === editingItem.id
          ? { ...item, name, price, description, image_url: imageUrl }
          : item
      ));
      setSuccess("Menu item updated successfully!");
    } else {
      const { data: newItem, error: insertError } = await supabase
        .from("menu_items")
        .insert({
          vendor_id: vendorId,
          restaurant_id: restaurantId,
          name,
          price,
          description,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }

      setMenuItems([newItem, ...menuItems]);
      setSuccess("Menu item added successfully!");
    }

    setSaving(false);
    resetForm();
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6 px-5">
        <h2 className="text-2xl font-bold">My Menu</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold"
          >
            + Add Item
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm font-semibold mb-4">{success}</p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 mb-8"
        >
          <h3 className="text-xl font-bold">
            {editingItem ? "Edit Item" : "Add New Item"}
          </h3>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Food Image</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-48 object-cover rounded-xl mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-xl px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 border border-gray-300 rounded-xl px-4"
              placeholder="e.g. Jollof Rice"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price (₦)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 border border-gray-300 rounded-xl px-4"
              placeholder="e.g. 1500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 h-24 resize-none"
              placeholder="Describe the food item"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
            >
              {saving ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 min-h-[48px] bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {menuItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <p className="text-gray-500">
            No menu items yet. Click "Add Item" to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-orange-400 font-semibold">₦{item.price}</p>
                {item.description && (
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                )}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-2 bg-blue-50 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 bg-red-50 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorMenu;