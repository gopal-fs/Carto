import { useState } from "react"
import {  Trash2, ToggleLeft, ToggleRight, PackagePlus, Search, Package } from "lucide-react"
import { Link } from "react-router-dom"

type VendorProduct = {
  id: number
  name: string
  description: string
  price: number
  unit: string
  stock: number
  available: boolean
  image: string
  category: string
}

const initialProducts: VendorProduct[] = [
  {
    id: 1,
    name: "Basmati Rice",
    description: "Premium long-grain basmati rice sourced from the finest farms. Aromatic and fluffy.",
    price: 1200,
    unit: "25 kg bag",
    stock: 150,
    available: true,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    category: "Grains",
  },
  {
    id: 2,
    name: "Cold-Pressed Mustard Oil",
    description: "Pure cold-pressed mustard oil, rich in omega-3 fatty acids. No additives.",
    price: 850,
    unit: "15 L tin",
    stock: 80,
    available: true,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "Oils",
  },
  {
    id: 3,
    name: "Turmeric Powder",
    description: "Freshly ground turmeric with high curcumin content. Vibrant colour and strong aroma.",
    price: 450,
    unit: "5 kg pack",
    stock: 200,
    available: true,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
    category: "Spices",
  },
  {
    id: 4,
    name: "Premium Lentils Mix",
    description: "Assorted premium lentils — toor, moong, masoor — cleaned and packed.",
    price: 1800,
    unit: "20 kg sack",
    stock: 60,
    available: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    category: "Pulses",
  },
  {
    id: 5,
    name: "Whole Wheat Flour",
    description: "Stone-ground whole wheat flour. High fibre, perfect for chapati and bread.",
    price: 1500,
    unit: "50 kg bag",
    stock: 40,
    available: false,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    category: "Flour",
  },
  {
    id: 6,
    name: "Refined Sugar",
    description: "Fine-grain refined white cane sugar, free-flowing and moisture-proof packed.",
    price: 960,
    unit: "25 kg bag",
    stock: 120,
    available: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Sweeteners",
  },
]

const ShopVendor = () => {
  const [products, setProducts] = useState<VendorProduct[]>(initialProducts)
  const [search, setSearch] = useState("")
  const [removing, setRemoving] = useState<number | null>(null)

 

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setRemoving(null)
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package size={20} className="text-indigo-600" />
            My Products
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} products listed</p>
        </div>
        <Link
          to="/shop/id/add-products"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm self-start sm:self-auto"
        >
          <PackagePlus size={16} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white transition"
        />
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <Package size={48} className="opacity-20" />
          <p className="text-sm font-medium">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(product => (
            <div
              key={product.id}
              className={`bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col
                ${product.available ? "border-gray-200" : "border-red-200"}`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover"
                />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                  {product.category}
                </span>
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full
                  ${product.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                  {product.available ? "In Stock" : "Out"}
                </span>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col gap-2.5 flex-1">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
                  </div>
                  <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                </div>

                {/* Toggle available */}
                <button
                  
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition
                    ${product.available
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                >
                  {product.available
                    ? <><ToggleRight size={15} /> Available</>
                    : <><ToggleLeft size={15} /> Unavailable</>}
                </button>

                {/* Actions */}
                <div className="flex mt-auto">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold transition">
                    
                    Accept Sample
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {removing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Trash2 size={18} className="text-red-500" />
              <h2 className="font-bold text-gray-800 text-sm">Delete Product?</h2>
            </div>
            <p className="text-xs text-gray-500">
              This will permanently remove the product from your catalogue. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setRemoving(null)}
                className="flex-1 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(removing)}
                className="flex-1 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ShopVendor
