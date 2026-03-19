import { useState } from "react"
import {
    Edit,
    LogOut,
    PercentCircle,
    Save,
    Tag,
    Trash2,
    X,
    Zap,
} from "lucide-react"

type SaleProduct = {
    id: number
    image_url: string
    name: string
    description: string
    original_price: number
    sale_price: number
    quantity_unit: string
}

const initialProducts: SaleProduct[] = [
    {
        id: 1,
        image_url: "https://www.allrecipes.com/thmb/p4F_knUDCrUNusNOTyjY_dCp8d4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/13338-quick-and-easy-vegetable-soup-DDMFS-4x3-402702f59e7a41519515cecccaba1b80.jpg",
        name: "Veg Soup",
        description: "A high quality garden vegetable soup served fresh",
        original_price: 299,
        sale_price: 199,
        quantity_unit: "piece",
    },
    {
        id: 2,
        image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
        name: "Basmati Rice",
        description: "Premium long-grain basmati rice, 1 kg pack",
        original_price: 149,
        sale_price: 99,
        quantity_unit: "kg",
    },
    {
        id: 3,
        image_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
        name: "Fresh Apples",
        description: "Crisp and fresh Shimla apples, handpicked daily",
        original_price: 120,
        sale_price: 79,
        quantity_unit: "kg",
    },
    {
        id: 4,
        image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
        name: "Cold Coffee",
        description: "Rich chilled cold coffee blend with cream",
        original_price: 89,
        sale_price: 59,
        quantity_unit: "piece",
    },
    {
        id: 5,
        image_url: "https://images.unsplash.com/photo-1631209121750-a9f656d28f8f?w=400",
        name: "Masala Oats",
        description: "Healthy instant masala oats, single serve",
        original_price: 55,
        sale_price: 35,
        quantity_unit: "piece",
    },
]

const discount = (original: number, sale: number) =>
    Math.round(((original - sale) / original) * 100)

/* ─── Edit Modal ─────────────────────────────────── */
type EditModalProps = {
    product: SaleProduct
    onSave: (updated: SaleProduct) => void
    onClose: () => void
}

const EditModal = ({ product, onSave, onClose }: EditModalProps) => {
    const [original, setOriginal] = useState(String(product.original_price))
    const [sale, setSale] = useState(String(product.sale_price))

    const handleSave = () => {
        onSave({ ...product, original_price: Number(original), sale_price: Number(sale) })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PercentCircle size={18} className="text-orange-500" />
                        <h2 className="font-semibold text-gray-800 text-sm">Edit Sale Range</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition">
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>

                <p className="text-xs text-gray-400 -mt-2">{product.name}</p>

                {/* Fields */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600">Original Price (₹)</label>
                        <input
                            type="number"
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600">Sale Price (₹)</label>
                        <input
                            type="number"
                            value={sale}
                            onChange={(e) => setSale(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        />
                    </div>
                    {Number(original) > 0 && Number(sale) > 0 && (
                        <p className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg">
                            Customer saves ₹{Number(original) - Number(sale)} — {discount(Number(original), Number(sale))}% off
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                        <Save size={14} />
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

/* ─── Main Sale Page ─────────────────────────────── */
const Sale = () => {
    const [products, setProducts] = useState<SaleProduct[]>(initialProducts)
    const [editing, setEditing] = useState<SaleProduct | null>(null)
    const [removing, setRemoving] = useState<number | null>(null)

    const handleDelete = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id))
        setRemoving(null)
    }

    const handleExitSale = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id))
    }

    const handleSave = (updated: SaleProduct) => {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    }

    const totalSavings = products.reduce(
        (acc, p) => acc + (p.original_price - p.sale_price),
        0
    )

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

            {/* ── Page header ── */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={20} className="text-orange-500" />
                        <h1 className="text-xl font-semibold text-gray-800">Flash Sale</h1>
                    </div>
                    <p className="text-sm text-gray-400">
                        {products.length} product{products.length !== 1 ? "s" : ""} on sale
                    </p>
                </div>

                {/* Stats strip */}
                <div className="flex gap-3 flex-wrap">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2 flex items-center gap-2">
                        <Tag size={15} className="text-orange-500" />
                        <span className="text-xs text-gray-600 font-medium">
                            Avg. discount: <span className="text-orange-600 font-bold">
                                {products.length
                                    ? Math.round(
                                        products.reduce((a, p) => a + discount(p.original_price, p.sale_price), 0) /
                                        products.length
                                    )
                                    : 0}%
                            </span>
                        </span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 flex items-center gap-2">
                        <PercentCircle size={15} className="text-emerald-600" />
                        <span className="text-xs text-gray-600 font-medium">
                            Total savings: <span className="text-emerald-600 font-bold">₹{totalSavings}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Empty state ── */}
            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
                    <PercentCircle size={48} className="opacity-30" />
                    <p className="text-sm font-medium">No products in flash sale</p>
                    <p className="text-xs">Go to Products and use "Set Sale Range" to add items</p>
                </div>
            )}

            {/* ── Product grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => {
                    const disc = discount(product.original_price, product.sale_price)

                    return (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Image + discount badge */}
                            <div className="relative">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-36 object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                                    {disc}% OFF
                                </span>
                            </div>

                            {/* Details */}
                            <div className="p-4 flex flex-col gap-3 flex-1">
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                                </div>

                                {/* Price range */}
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-emerald-600">₹{product.sale_price}</span>
                                    <span className="text-xs text-gray-400 line-through">₹{product.original_price}</span>
                                    <span className="text-xs text-gray-400">/ {product.quantity_unit}</span>
                                </div>

                                <div className="bg-orange-50 rounded-lg px-3 py-1.5 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Customer saves</span>
                                    <span className="text-xs font-bold text-orange-600">
                                        ₹{product.original_price - product.sale_price}
                                    </span>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => setEditing(product)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl text-xs font-medium transition-colors"
                                    >
                                        <Edit size={13} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setRemoving(product.id)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-red-500 hover:bg-red-50 border border-red-100 rounded-xl text-xs font-medium transition-colors"
                                    >
                                        <Trash2 size={13} />
                                        Delete
                                    </button>
                                </div>

                                {/* Exit Sale */}
                                <button
                                    onClick={() => handleExitSale(product.id)}
                                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 text-xs font-semibold transition-all"
                                >
                                    <LogOut size={13} />
                                    Exit Sale
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ── Delete confirm modal ── */}
            {removing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Trash2 size={18} className="text-red-500" />
                            <h2 className="font-semibold text-gray-800 text-sm">Delete Product?</h2>
                        </div>
                        <p className="text-xs text-gray-500">
                            This will permanently remove the product from your sale. This action cannot be undone.
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

            {/* ── Edit modal ── */}
            {editing && (
                <EditModal
                    product={editing}
                    onSave={handleSave}
                    onClose={() => setEditing(null)}
                />
            )}
        </div>
    )
}

export default Sale
