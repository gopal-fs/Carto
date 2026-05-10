import { useEffect, useRef, useState } from "react";
import {
  Edit,
  ImagePlus,
  Percent,
  ToggleLeft,
  ToggleRight,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

type SoldBy = {
  category: "piece" | "kg" | "litre";
  prices: Record<string, string>;
};

type Product = {
  product_id: string;
  image: string;
  name: string;
  description: string;
  sold_by: SoldBy;
  features: string;
  isAvailable: boolean;
  discount?: number;
};

const backend_url = import.meta.env.VITE_BACKEND_URL + "/shop";

const PRICE_LABELS: Record<string, string> = {
  piece: "Per Piece",
  g100: "100 g",
  g250: "250 g",
  g500: "500 g",
  kg1: "1 kg",
  ml100: "100 ml",
  ml250: "250 ml",
  ml500: "500 ml",
  l1: "1 L",
};

const formatPriceLabel = (key: string) => PRICE_LABELS[key] ?? key;

const num = (v: string | number) =>
  typeof v === "string" ? parseFloat(v) : v;

const applyDiscount = (price: number, discount: number) =>
  Math.round((price * (100 - discount)) / 100);

const formatRange = (prices: Record<string, string>, discount = 0) => {
  const values = Object.values(prices)
    .map(num)
    .filter((v) => !isNaN(v));
  if (values.length === 0) return "—";
  const final = discount > 0 ? values.map((v) => applyDiscount(v, discount)) : values;
  const min = Math.min(...final);
  const max = Math.max(...final);
  return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
};

const ShopPro = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashSaleFor, setFlashSaleFor] = useState<Product | null>(null);
  const [discountInput, setDiscountInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // edit modal state
  const [editingFor, setEditingFor] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFeatures, setEditFeatures] = useState("");
  const [editPrices, setEditPrices] = useState<Record<string, string>>({});
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const editFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(backend_url + "/products", {
          withCredentials: true,
        });
        if (res.data?.success) {
          const list: Product[] = (res.data.products ?? []).filter(
            (p: Product) => p && p.sold_by && p.sold_by.prices
          );
          setProducts(list);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Failed to load products");
        } else {
          toast.error("Failed to load products");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openFlashSale = (product: Product) => {
    setFlashSaleFor(product);
    setDiscountInput(product.discount ? String(product.discount) : "");
  };

  const closeFlashSale = () => {
    setFlashSaleFor(null);
    setDiscountInput("");
  };

  const deleteProduct=async(product_id:string)=>{
    try{
      const update=await axios.put(backend_url+"/delete-product",{product_id},{
        withCredentials:true
      })

      if(update.data?.success){
        const updatedProducts=products.filter(prev=>prev.product_id!==product_id);
        setProducts(updatedProducts);
        return toast.success(update.data.message);
      }
    }
    catch(err){
      if(axios.isAxiosError(err)){
        return toast.error(err.response?.data?.message || "Failed to Delete Product");
      }
    }
  }

  const applyFlashSale = async () => {
    if (!flashSaleFor) return;
    const discount = parseFloat(discountInput);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return toast.error("Enter a discount between 0 and 100");
    }

    setSubmitting(true);
    try {
      const res = await axios.patch(
        `${backend_url}/products/${flashSaleFor.product_id}/flash-sale`,
        { discount },
        { withCredentials: true }
      );
      if (res.data?.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.product_id === flashSaleFor.product_id
              ? { ...p, discount: discount > 0 ? discount : undefined }
              : p
          )
        );
        toast.success(res.data.message || "Flash sale applied");
        closeFlashSale();
      } else {
        toast.error(res.data?.message || "Failed to apply discount");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to apply discount");
      } else {
        toast.error("Failed to apply discount");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (product: Product) => {
    setEditingFor(product);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditFeatures(product.features);
    setEditPrices(
      Object.fromEntries(
        Object.entries(product.sold_by.prices).map(([k, v]) => [k, String(v)])
      )
    );
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const closeEdit = () => {
    setEditingFor(null);
    setEditName("");
    setEditDescription("");
    setEditFeatures("");
    setEditPrices({});
    setEditImageFile(null);
    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImagePreview(null);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const submitEdit = async () => {
    if (!editingFor) return;
    if (!editName.trim() || !editDescription.trim() || !editFeatures.trim()) {
      return toast.error("Name, description and features are required");
    }
    if (Object.values(editPrices).some((v) => v.trim() === "" || isNaN(Number(v)))) {
      return toast.error("All prices must be valid numbers");
    }

    const data = new FormData();
    data.append("name", editName);
    data.append("description", editDescription);
    data.append("features", editFeatures);
    data.append("pricing", JSON.stringify(editPrices));
    if (editImageFile) data.append("productImage", editImageFile);

    setEditSubmitting(true);
    try {
      const res = await axios.patch(
        `${backend_url}/products/${editingFor.product_id}`,
        data,
        { withCredentials: true }
      );
      if (res.data?.success) {
        const updated: Product = res.data.product;
        setProducts((prev) =>
          prev.map((p) => (p.product_id === editingFor.product_id ? updated : p))
        );
        toast.success(res.data.message || "Product updated");
        closeEdit();
      } else {
        toast.error(res.data?.message || "Failed to update product");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to update product");
      } else {
        toast.error("Failed to update product");
      }
    } finally {
      setEditSubmitting(false);
    }
  };

  const toggleAvailability = async (product: Product) => {
    const next = !product.isAvailable;
    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === product.product_id ? { ...p, isAvailable: next } : p
      )
    );
    try {
      const res = await axios.patch(
        `${backend_url}/products/${product.product_id}/availability`,
        { isAvailable: next },
        { withCredentials: true }
      );
      if(res.data?.success) return toast.success(res.data.message);
      if (!res.data?.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.product_id === product.product_id ? { ...p, isAvailable: !next } : p
          )
        );
        toast.error(res.data?.message || "Failed to update availability");
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === product.product_id ? { ...p, isAvailable: !next } : p
        )
      );
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to update availability");
      } else {
        toast.error("Failed to update availability");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400">
        No products yet. Add your first one.
      </div>
    );
  }

  const previewDiscount = parseFloat(discountInput);
  const previewValid = !isNaN(previewDiscount) && previewDiscount > 0;

  return (
    <>
      <div className="flex flex-wrap w-full justify-center items-start sm:justify-start gap-4 p-2">
        {products.map((product) => {
          const hasDiscount = !!product.discount && product.discount > 0;
          return (
            <div
              key={product.product_id}
              className={`relative w-full max-w-72 border rounded-2xl p-5 hover:shadow-lg transition-shadow flex flex-col gap-3 ${
                product.isAvailable
                  ? "border-gray-200 bg-white"
                  : "border-red-200 bg-red-50"
              }`}
            >
              {/* Image with optional discount badge */}
              <div className="relative">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                )}
                {hasDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Name + description */}
              <div>
                <h3
                  className={`font-semibold text-sm ${
                    product.isAvailable ? "text-gray-900" : "text-red-600"
                  }`}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Price range + availability */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {hasDiscount ? (
                    <>
                      <span className="text-xs text-gray-400 line-through">
                        {formatRange(product.sold_by.prices)}
                      </span>
                      <span className="text-base font-bold text-emerald-600">
                        {formatRange(product.sold_by.prices, product.discount)}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-bold text-emerald-600">
                      {formatRange(product.sold_by.prices)}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 capitalize">
                    / {product.sold_by.category}
                  </span>
                </div>

                <button
                  onClick={() => toggleAvailability(product)}
                  className={`flex cursor-pointer items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    product.isAvailable
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {product.isAvailable ? (
                    <ToggleRight className="w-4 h-4" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                  {product.isAvailable ? "Available" : "Unavailable"}
                </button>
              </div>

              {/* Edit | Delete */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-xs font-medium border border-blue-100"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button onClick={()=>deleteProduct(product.product_id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs font-medium border border-red-100">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              {/* Flash Sale */}
              <button
                onClick={() => openFlashSale(product)}
                className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 text-xs font-semibold transition-colors"
              >
                <Zap className="w-4 h-4" />
                Flash Sale
              </button>
            </div>
          );
        })}
      </div>

      {/* Flash Sale Modal */}
      {flashSaleFor && (
        <div
          onClick={closeFlashSale}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Flash Sale
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">{flashSaleFor.name}</p>
              </div>
              <button
                onClick={closeFlashSale}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Discount input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Discount %</label>
              <div className="relative">
                <input
                  type="number"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="e.g. 20"
                  min="0"
                  max="100"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400">
                Enter 0 to clear an existing discount.
              </p>
            </div>

            {/* Live preview */}
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Preview
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(flashSaleFor.sold_by.prices).map(([key, value]) => {
                  const original = num(value);
                  const discounted = previewValid
                    ? applyDiscount(original, previewDiscount)
                    : null;
                  return (
                    <div key={key} className="flex flex-col">
                      <span className="text-[11px] text-gray-400">
                        {formatPriceLabel(key)}
                      </span>
                      {discounted !== null ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-gray-400 line-through">
                            ₹{original}
                          </span>
                          <span className="text-sm font-bold text-emerald-600">
                            ₹{discounted}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-gray-800">
                          ₹{original}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={closeFlashSale}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={applyFlashSale}
                disabled={submitting}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg text-sm font-medium"
              >
                {submitting ? "Applying..." : "Apply Discount"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingFor && (
        <div
          onClick={closeEdit}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4 my-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-500" />
                  Edit Product
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">{editingFor.name}</p>
              </div>
              <button
                onClick={closeEdit}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Image</label>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={editImagePreview ?? editingFor.image}
                  alt="product"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => editFileRef.current?.click()}
                  className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 border border-gray-200 px-2 py-1 rounded-lg text-xs text-gray-700 hover:bg-gray-100 shadow"
                >
                  <ImagePlus className="w-3.5 h-3.5" /> Change
                </button>
                <input
                  ref={editFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleEditImage}
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            {/* Features */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Features</label>
              <textarea
                value={editFeatures}
                onChange={(e) => setEditFeatures(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            {/* Prices */}
            <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3">
              <label className="text-sm font-medium text-gray-700">
                Prices ({editingFor.sold_by.category})
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(editPrices).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">
                      {formatPriceLabel(key)}
                    </span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) =>
                          setEditPrices((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={closeEdit}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                disabled={editSubmitting}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium"
              >
                {editSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPro;
