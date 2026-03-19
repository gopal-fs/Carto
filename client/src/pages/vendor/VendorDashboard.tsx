import {
  ShoppingCart,
  Users,
  TrendingUp,
  FlaskConical,
  ArrowUpRight,
  Clock,
  Package,
  Tag,
  ClipboardList,
  Eye,
  ChevronRight,
  BadgeCheck,
  Hourglass,
  CircleDot,
} from "lucide-react"
import { Link } from "react-router-dom"

const recentOrders = [
  { id: "#V1023", shop: "The Spice Hub", product: "Basmati Rice × 50kg", amount: "₹6,000", status: "Delivered", time: "15 min ago" },
  { id: "#V1022", shop: "Fresh Basket", product: "Mustard Oil × 20L", amount: "₹1,700", status: "Processing", time: "1 hr ago" },
  { id: "#V1021", shop: "Urban Mart", product: "Turmeric Powder × 10kg", amount: "₹900", status: "Pending", time: "2 hr ago" },
  { id: "#V1020", shop: "Green Corner", product: "Wheat Flour × 50kg", amount: "₹1,500", status: "Delivered", time: "Yesterday" },
]

const statusStyle: Record<string, { cls: string; icon: React.ReactNode }> = {
  Delivered: { cls: "bg-emerald-100 text-emerald-700", icon: <BadgeCheck size={11} /> },
  Processing: { cls: "bg-amber-100 text-amber-700", icon: <Hourglass size={11} /> },
  Pending:    { cls: "bg-gray-100 text-gray-600",    icon: <CircleDot size={11} /> },
}

const stats = [
  { label: "Total Products", value: "24", icon: Package, color: "indigo", trend: "+2 this week" },
  { label: "Samples Sent", value: "138", icon: FlaskConical, color: "orange", trend: "+12 today" },
  { label: "Partner Shops", value: "31", icon: Users, color: "violet", trend: "3 new this month" },
  { label: "Monthly Revenue", value: "₹2.4L", icon: TrendingUp, color: "emerald", trend: "+18% ↑" },
]

const iconColor: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-600",
  orange: "bg-orange-100 text-orange-600",
  violet: "bg-violet-100 text-violet-600",
  emerald: "bg-emerald-100 text-emerald-600",
}

const quickActions = [
  { label: "Add New Product", icon: Package, color: "indigo", to: "/vendor/add-product" },
  { label: "Sell Sample", icon: FlaskConical, color: "orange", to: "/vendor/sell-sample" },
  { label: "View My Products", icon: Eye, color: "violet", to: "/vendor/products" },
  { label: "View Orders", icon: ClipboardList, color: "emerald", to: "/vendor/orders" },
]

const VendorDashboard = () => {
  return (
    <div className="flex flex-col gap-6 pb-6">

      {/* ── Greeting Banner ── */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 rounded-2xl p-5 sm:p-6 text-white overflow-hidden">
        

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">Vendor Portal</p>
            <h2 className="text-xl sm:text-2xl font-bold">Welcome, Rajesh Traders!</h2>
            <p className="text-indigo-100 text-sm mt-1">Here's your business snapshot for today.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm font-medium self-start sm:self-auto border border-white/20">
            <Clock size={15} />
            Mon, 19 Mar 2026
          </div>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 phone:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
            <div className={`flex items-center justify-center h-12 w-12 rounded-xl flex-shrink-0 ${iconColor[stat.color]}`}>
              <stat.icon size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-bold text-gray-800 truncate">{stat.value}</span>
              <span className="text-xs text-gray-500 font-medium truncate">{stat.label}</span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight size={10} />
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Orders table */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
              <ShoppingCart size={16} className="text-indigo-600" />
              Recent Orders
            </h3>
            <Link to="/vendor/orders" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
              View All <ChevronRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-gray-400 border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 font-semibold">Order</th>
                  <th className="text-left px-5 py-3 font-semibold">Shop</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Product</th>
                  <th className="text-left px-5 py-3 font-semibold">Amount</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => {
                  const s = statusStyle[order.status]
                  return (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3 font-semibold text-gray-700 text-xs">{order.id}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs font-medium">{order.shop}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{order.product}</td>
                      <td className="px-5 py-3 font-bold text-gray-800 text-xs">{order.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>
                          {s.icon}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col gap-3">
          <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2 mb-1">
            <Tag size={15} className="text-indigo-500" />
            Quick Actions
          </h3>
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.to}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 transition group"
            >
              <div className={`h-9 w-9 flex items-center justify-center rounded-xl flex-shrink-0 ${iconColor[action.color]}`}>
                <action.icon size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 flex-1">{action.label}</span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition" />
            </Link>
          ))}
        </div>

      </div>

     

    </div>
  )
}

export default VendorDashboard
