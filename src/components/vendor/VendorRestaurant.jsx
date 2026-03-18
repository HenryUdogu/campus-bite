import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const VendorRestaurant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (vendor) {
        setVendorId(vendor.id);

        const { data: existingRestaurant } = await supabase
          .from("restaurants")
          .select("*")
          .eq("vendor_id", vendor.id)
          .single();

        if (existingRestaurant) {
          setRestaurant(existingRestaurant);
          setName(existingRestaurant.name);
          setDescription(existingRestaurant.description || "");
          setImagePreview(existingRestaurant.image_url);
        }
      }
      setLoading(false);
    };
    fetchRestaurant();
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    let imageUrl = restaurant?.image_url || null;

    if (image) {
      const fileName = `${vendorId}-${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("restaurant-images")
        .upload(fileName, image);

      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("restaurant-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    if (restaurant) {
      const { error: updateError } = await supabase
        .from("restaurants")
        .update({ name, description, image_url: imageUrl })
        .eq("id", restaurant.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
      setSuccess("Restaurant updated successfully!");
    } else {
      const { error: insertError } = await supabase.from("restaurants").insert({
        vendor_id: vendorId,
        name,
        description,
        image_url: imageUrl,
      });

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
      setSuccess("Restaurant created successfully!");
    }

    setSaving(false);
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-screen py-6">
      <h2 className="text-2xl font-bold mb-6 px-5">Restaurant Setup</h2>

      {error && (
        <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm font-semibold mb-4">{success}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 max-w-[100%] md:mx-5"
      >
        <div className="flex flex-col gap-2 max-w-[100%]">
          <label className="font-semibold">Restaurant Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-[100%] h-48 object-cover rounded-xl mb-2"
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
          <label className="font-semibold">Restaurant Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 border border-gray-300 rounded-xl px-4"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 h-28 resize-none"
            placeholder="Describe your restaurant"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="min-h-[48px] bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-bold text-lg"
        >
          {saving
            ? "Saving..."
            : restaurant
              ? "Update Restaurant"
              : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default VendorRestaurant;
