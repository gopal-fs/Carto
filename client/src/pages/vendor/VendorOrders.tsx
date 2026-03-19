import { useState } from "react"
import {
  ClipboardList,
  BadgeCheck,
  
  CircleDot,
 
  X,
  Eye,
  Search,
} from "lucide-react"

type Order = {
  id: string
  shop: string
  shopType: string
  product: string
  quantity: string
  amount: number
  status: "Accepted" | "Pending"
  date: string
}

const allOrders: Order[] = [
  { id: "#V1023", shop: "The Spice Hub",   shopType: "Grocery",        product: "Basmati Rice",          quantity: "50 kg",  amount: 6000,  status: "Accepted",  date: "19 Mar 2026" },
  { id: "#V1022", shop: "Fresh Basket",    shopType: "Organic",        product: "Mustard Oil",           quantity: "20 L",   amount: 1700,  status: "Accepted", date: "19 Mar 2026" },
  { id: "#V1021", shop: "Urban Mart",      shopType: "Essentials",     product: "Turmeric Powder",       quantity: "10 kg",  amount: 900,   status: "Pending",    date: "18 Mar 2026" },
  { id: "#V1020", shop: "Green Corner",    shopType: "Farm Fresh",     product: "Wheat Flour",           quantity: "50 kg",  amount: 1500,  status: "Accepted",  date: "18 Mar 2026" },
  { id: "#V1019", shop: "The Spice Hub",   shopType: "Grocery",        product: "Premium Lentils",       quantity: "40 kg",  amount: 3600,  status: "Accepted",    date: "17 Mar 2026" },
  { id: "#V1018", shop: "Fresh Basket",    shopType: "Organic",        product: "Refined Sugar",         quantity: "25 kg",  amount: 960,   status: "Pending",  date: "17 Mar 2026" },
  { id: "#V1017", shop: "Urban Mart",      shopType: "Essentials",     product: "Basmati Rice",          quantity: "100 kg", amount: 4800,  status: "Accepted",  date: "16 Mar 2026" },
  { id: "#V1016", shop: "Green Corner",    shopType: "Farm Fresh",     product: "Mustard Oil",           quantity: "30 L",   amount: 1700,  status: "Pending",    date: "15 Mar 2026" },
]

type Status = Order["status"] | "All"

const tabs: Status[] = ["All", "Pending", "Accepted"]

const statusConfig: Record<string, { cls: string; icon:React.ReactNode }> = {
  Accepted:  { cls: "bg-emerald-100 text-emerald-700", icon: <BadgeCheck size={11} /> },
  Pending:    { cls: "bg-gray-100 text-gray-600",        icon: <CircleDot size={11} /> },

}

const VendorOrders = () => {
  const [activeTab, setActiveTab] = useState<Status>("All")
  const [search, setSearch] = useState("")
  const [viewing, setViewing] = useState<Order | null>(null)

  const filtered = allOrders.filter(o => {
    const matchesTab = activeTab === "All" || o.status === activeTab
    const matchesSearch =
      o.shop.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const counts: Record<Status, number> = {
    All:        allOrders.length,
    Pending:    allOrders.filter(o => o.status === "Pending").length,
    Accepted:  allOrders.filter(o => o.status === "Accepted").length,
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList size={20} className="text-indigo-600" />
            Orders
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Track orders from partner shops</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, shops..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white transition"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-visible">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition
              ${activeTab === tab
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600"}`}
          >
            {tab}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
              ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-gray-400 border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3.5 font-semibold">Order ID</th>
                <th className="text-left px-5 py-3.5 font-semibold">Shop</th>
                <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Product</th>
                <th className="text-left px-5 py-3.5 font-semibold hidden sm:table-cell">Qty</th>
                <th className="text-left px-5 py-3.5 font-semibold">Amount</th>
                <th className="text-left px-5 py-3.5 font-semibold">Status</th>
                <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">Date</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <ClipboardList size={36} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm font-medium">No orders found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order, i) => {
                  const s = statusConfig[order.status]
                  return (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3.5 font-bold text-indigo-600 text-xs">{order.id}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-semibold text-gray-800">{order.shop}</p>
                        <p className="text-[10px] text-gray-400">{order.shopType}</p>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 hidden md:table-cell">{order.product}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 hidden sm:table-cell">{order.quantity}</td>
                      <td className="px-5 py-3.5 text-xs font-bold text-gray-800">₹{order.amount.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>
                          {s.icon}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[11px] text-gray-400 hidden lg:table-cell">{order.date}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setViewing(order)}
                          className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail drawer/modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-800 text-sm">Order Details</h2>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">{viewing.id}</p>
              </div>
              <button onClick={() => setViewing(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Status badge */}
              <span className={`self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusConfig[viewing.status].cls}`}>
                {statusConfig[viewing.status].icon}
                {viewing.status}
              </span>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Shop", value: viewing.shop },
                  { label: "Shop Type", value: viewing.shopType },
                  { label: "Product", value: viewing.product },
                  { label: "Quantity", value: viewing.quantity },
                  { label: "Amount", value: `₹${viewing.amount.toLocaleString()}` },
                  { label: "Date", value: viewing.date },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{row.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setViewing(null)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default VendorOrders
