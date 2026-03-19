import { useState } from "react"
import {
  FlaskConical,
  Send,
  Eye,
  X,
  CheckCircle2,
  MapPin,
  Clock,
  Star,
  Package,
} from "lucide-react"

type VendorProduct = {
  id: number
  name: string
  description: string
  price: number
  unit: string
  image: string
  category: string
}

type Shop = {
  id: number
  name: string
  type: string
  location: string
  timing: string
  rating: number
}

const products: VendorProduct[] = [
  {
    id: 1,
    name: "Basmati Rice",
    description: "Premium long-grain basmati rice sourced from finest farms.",
    price: 1200,
    unit: "25 kg bag",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    category: "Grains",
  },
  {
    id: 2,
    name: "Cold-Pressed Mustard Oil",
    description: "Pure cold-pressed mustard oil, rich in omega-3 fatty acids.",
    price: 850,
    unit: "15 L tin",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "Oils",
  },
  {
    id: 3,
    name: "Turmeric Powder",
    description: "Freshly ground turmeric with high curcumin content.",
    price: 450,
    unit: "5 kg pack",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
    category: "Spices",
  },
  {
    id: 4,
    name: "Premium Lentils Mix",
    description: "Assorted premium lentils — toor, moong, masoor — cleaned and packed.",
    price: 1800,
    unit: "20 kg sack",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    category: "Pulses",
  },
  {
    id: 5,
    name: "Whole Wheat Flour",
    description: "Stone-ground whole wheat flour. High fibre, perfect for chapati.",
    price: 1500,
    unit: "50 kg bag",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    category: "Flour",
  },
  {
    id: 6,
    name: "Refined Sugar",
    description: "Fine-grain refined white cane sugar, moisture-proof packed.",
    price: 960,
    unit: "25 kg bag",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Sweeteners",
  },
]

const shops: Shop[] = [
  { id: 1, name: "The Spice Hub", type: "Grocery & Fresh Produce", location: "Hyderabad, TS", timing: "9:00 AM – 10:00 PM", rating: 4.8 },
  { id: 2, name: "Fresh Basket", type: "Organic & Health Foods", location: "Bangalore, KA", timing: "8:00 AM – 9:00 PM", rating: 4.6 },
  { id: 3, name: "Urban Mart", type: "Daily Essentials", location: "Mumbai, MH", timing: "7:00 AM – 11:00 PM", rating: 4.5 },
  { id: 4, name: "Green Corner", type: "Farm Fresh Store", location: "Chennai, TN", timing: "8:30 AM – 8:30 PM", rating: 4.7 },
]

const VendorSellSample = () => {
  // selectedProduct → which product's modal is open (null = closed)
  const [selectedProduct, setSelectedProduct] = useState<VendorProduct | null>(null)

  // sentMap[productId] = Set of shopIds that received a sample
  const [sentMap, setSentMap] = useState<Record<number, Set<number>>>({})

  const openModal = (product: VendorProduct) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const sendSample = (productId: number, shopId: number) => {
    setSentMap(prev => ({
      ...prev,
      [productId]: new Set([...(prev[productId] || []), shopId]),
    }))
  }

  const isSent = (productId: number, shopId: number) =>
    sentMap[productId]?.has(shopId) ?? false

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FlaskConical size={20} className="text-orange-500" />
          Sell Sample
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Select a product and send free samples to partner shops
        </p>
      </div>

      {/* Info banner */}
      <div className="mb-5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-start gap-3">
        <FlaskConical size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-orange-700 leading-relaxed">
          Click <span className="font-bold">Send Sample</span> on any product to select which shops to send samples to.
          This helps shops discover your products and place bulk orders.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(product => {
          const sentCount = sentMap[product.id]?.size ?? 0

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                  {product.category}
                </span>
                {sentCount > 0 && (
                  <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {sentCount} sent
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col gap-2.5 flex-1">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                </div>

                <div>
                  <span className="text-base font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
                </div>

                {/* Send Sample button */}
                <button
                  onClick={() => openModal(product)}
                  className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <FlaskConical size={14} />
                  Send Sample
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Shop Selection Modal ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <FlaskConical size={16} className="text-orange-500" />
                  <h2 className="font-bold text-gray-800 text-sm">Send Sample</h2>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Package size={11} />
                  {selectedProduct.name} · ₹{selectedProduct.price.toLocaleString()} / {selectedProduct.unit}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Shop list */}
            <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto">
              {shops.map(shop => {
                const sent = isSent(selectedProduct.id, shop.id)
                return (
                  <div
                    key={shop.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
                  >
                    {/* Shop info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-indigo-100">
                        <img src="/logosym.png" className="h-8 w-8 object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{shop.name}</p>
                        <p className="text-xs text-indigo-500 font-medium truncate">{shop.type}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                          <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                            <MapPin size={10} />
                            {shop.location}
                          </span>
                          <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                            <Clock size={10} />
                            {shop.timing}
                          </span>
                          <span className="flex items-center gap-0.5 text-[11px] text-amber-500 font-semibold">
                            <Star size={10} className="fill-amber-400" />
                            {shop.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0 sm:flex-col">
                      {sent ? (
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 size={14} />
                          Sent
                        </div>
                      ) : (
                        <button
                          onClick={() => sendSample(selectedProduct.id, shop.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition"
                        >
                          <Send size={13} />
                          Send Sample
                        </button>
                      )}
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold transition">
                        <Eye size={13} />
                        View Shop
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-[11px] text-gray-400 text-center">
                Samples are free. Shops will receive a notification about your product.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default VendorSellSample
