import { useOutletContext } from "react-router-dom"
import {
  Bike,
  Star,
  IndianRupee,
  CheckCircle2,
  Clock,
  MapPin,
  PackageCheck,
  Zap,
} from "lucide-react"

type OutletCtx = { isActive: boolean }

const todayOrders = [
  { id: "#D1041", customer: "Arjun Mehta",  address: "Flat 204, Lake View Apts, Madhapur", shop: "The Spice Hub",  amount: 657, status: "Delivered" },
  { id: "#D1040", customer: "Priya Singh",  address: "No. 12, 3rd Cross, HSR Layout",      shop: "Fresh Basket",  amount: 389, status: "Delivered" },
  { id: "#D1039", customer: "Rahul Kumar",  address: "202, Sea Pearl Society, Versova",    shop: "Urban Mart",    amount: 105, status: "On the way" },
]

const DeliveryDashboard = () => {
  const { isActive } = useOutletContext<OutletCtx>()

  return (
    <div className="flex flex-col gap-6 pb-6">

      {/* ── Greeting ── */}
      <div className={`relative rounded-2xl p-5 sm:p-6 text-white overflow-hidden
        ${isActive
          ? "bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-400"
          : "bg-gradient-to-br from-gray-500 to-gray-400"}`}>
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isActive ? "text-teal-100" : "text-gray-300"}`}>
              {isActive ? "You are On Duty" : "You are Off Duty"}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold">Good morning, Ravi!</h2>
            <p className={`text-sm mt-1 ${isActive ? "text-teal-100" : "text-gray-300"}`}>
              {isActive ? "You have 3 orders pending today." : "Go active to start receiving orders."}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold self-start sm:self-auto border
            ${isActive ? "bg-white/20 border-white/20" : "bg-white/10 border-white/10"}`}>
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white animate-pulse" : "bg-gray-300"}`} />
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Deliveries", value: "3",     icon: Bike,        color: "teal",   sub: "2 delivered" },
          { label: "Total Deliveries",   value: "218",   icon: PackageCheck, color: "indigo", sub: "All time" },
          { label: "Today's Earnings",   value: "₹320",  icon: IndianRupee,  color: "emerald", sub: "+₹60 tip" },
          { label: "Overall Rating",     value: "4.7",   icon: Star,        color: "amber",  sub: "218 ratings" },
        ].map((s, i) => {
          const cls: Record<string, string> = {
            teal:   "bg-teal-100 text-teal-600",
            indigo: "bg-indigo-100 text-indigo-600",
            emerald:"bg-emerald-100 text-emerald-600",
            amber:  "bg-amber-100 text-amber-600",
          }
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
              <div className={`h-10 w-10 flex items-center justify-center rounded-xl ${cls[s.color]}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Two columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Today's Orders */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <Bike size={15} className="text-teal-600" />
              Today's Orders
            </h3>
            <span className="text-xs text-gray-400">{todayOrders.length} orders</span>
          </div>
          <div className="divide-y divide-gray-100">
            {todayOrders.map((o, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition">
                <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                  ${o.status === "Delivered" ? "bg-emerald-100 text-emerald-600" : "bg-teal-100 text-teal-600"}`}>
                  {o.status === "Delivered" ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-800">{o.customer}</p>
                    <span className="text-xs font-bold text-teal-600 flex-shrink-0">₹{o.amount}</span>
                  </div>
                  <p className="text-xs text-indigo-500 font-medium">{o.shop}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} />
                    {o.address}
                  </p>
                </div>
                <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1
                  ${o.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : "bg-teal-100 text-teal-700"}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats sidebar */}
        <div className="flex flex-col gap-4">

         

          {/* Earnings summary */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-3">
              <Zap size={15} className="text-amber-500" />
              Earnings
            </h3>
            {[
              { label: "Today",     amount: "₹320" },
              { label: "This Week", amount: "₹2,140" },
              { label: "This Month",amount: "₹8,960" },
              { label: "Total",     amount: "₹45,200" },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-500">{e.label}</span>
                <span className="text-xs font-bold text-gray-800">{e.amount}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default DeliveryDashboard
