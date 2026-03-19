import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import {
  ClipboardList,
  MapPin,
  Phone,
  Package,
  Navigation,
  CheckCircle2,
  Lock,
  WifiOff,
  ShoppingBag,
  IndianRupee,
  Clock,
} from "lucide-react"

type OutletCtx = { isActive: boolean }

type OrderState = "pending" | "accepted" | "delivered"

type Order = {
  id: string
  customer: string
  phone: string
  items: string
  amount: number
  pickup: string
  delivery: string
  distance: string
  shopName: string
}

const dummyOrders: Order[] = [
  {
    id: "ORD-1041",
    customer: "Arjun Mehta",
    phone: "+91 98765 43210",
    items: "Veg Soup × 2, Cold Coffee × 1",
    amount: 657,
    pickup: "The Spice Hub, Banjara Hills, Hyderabad",
    delivery: "Flat 204, Lake View Apts, Madhapur, Hyderabad",
    distance: "3.2 km",
    shopName: "The Spice Hub",
  },
  {
    id: "ORD-1042",
    customer: "Priya Singh",
    phone: "+91 87654 32109",
    items: "Basmati Rice × 1, Fresh Apples × 2",
    amount: 389,
    pickup: "Fresh Basket, Koramangala, Bangalore",
    delivery: "No. 12, 3rd Cross, HSR Layout, Bangalore",
    distance: "2.7 km",
    shopName: "Fresh Basket",
  },
  {
    id: "ORD-1043",
    customer: "Rahul Kumar",
    phone: "+91 76543 21098",
    items: "Masala Oats × 3, Refined Sugar × 1",
    amount: 1065,
    pickup: "Urban Mart, Andheri West, Mumbai",
    delivery: "202, Sea Pearl Society, Versova, Mumbai",
    distance: "4.1 km",
    shopName: "Urban Mart",
  },
]

const DeliveryOrders = () => {
  const { isActive } = useOutletContext<OutletCtx>()

  const [orderStates, setOrderStates] = useState<Record<string, OrderState>>({})
  const [otpValues, setOtpValues] = useState<Record<string, string>>({})
  const [otpError, setOtpError] = useState<Record<string, string>>({})

  const setOrderState = (id: string, state: OrderState) =>
    setOrderStates(prev => ({ ...prev, [id]: state }))

  const handleOtpChange = (id: string, val: string) => {
    if (val.length <= 6 && /^\d*$/.test(val)) {
      setOtpValues(prev => ({ ...prev, [id]: val }))
      setOtpError(prev => ({ ...prev, [id]: "" }))
    }
  }

  const handleOtpSubmit = (id: string) => {
    const otp = otpValues[id] || ""
    if (otp.length < 4) {
      setOtpError(prev => ({ ...prev, [id]: "Enter at least 4 digits" }))
      return
    }
    // No real validation — any 4+ digit OTP succeeds
    setOrderState(id, "delivered")
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList size={20} className="text-teal-600" />
          Orders
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">{dummyOrders.length} orders available</p>
      </div>

      {/* Offline banner */}
      {!isActive && (
        <div className="mb-5 flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5">
          <WifiOff size={18} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-gray-600">You are currently offline</p>
            <p className="text-xs text-gray-400">Go Active from the sidebar or header to accept orders.</p>
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="flex flex-col gap-4">
        {dummyOrders.map(order => {
          const state: OrderState = orderStates[order.id] || "pending"

          return (
            <div
              key={order.id}
              className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition
                ${state === "delivered" ? "border-emerald-200" : "border-gray-200"}`}
            >
              {/* Card header */}
              <div className={`flex items-center justify-between px-5 py-3 border-b
                ${state === "delivered" ? "border-emerald-100 bg-emerald-50" : "border-gray-100 bg-gray-50/50"}`}>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={15} className={state === "delivered" ? "text-emerald-600" : "text-teal-600"} />
                  <span className="text-xs font-bold text-gray-700">{order.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={11} />
                    Just now
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full
                    ${state === "delivered"
                      ? "bg-emerald-100 text-emerald-700"
                      : state === "accepted"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-amber-100 text-amber-700"}`}>
                    {state === "delivered" ? "Delivered" : state === "accepted" ? "Accepted" : "New"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">

                {/* Customer + items */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-gray-800">{order.customer}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone size={11} className="text-gray-400" />
                      {order.phone}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Package size={11} className="text-gray-400" />
                      {order.items}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 self-start sm:self-auto">
                    <IndianRupee size={15} className="text-teal-600" />
                    <span className="text-lg font-bold text-teal-600">{order.amount}</span>
                  </div>
                </div>

                {/* Pickup + Delivery */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2.5 bg-indigo-50 rounded-xl px-3 py-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-black text-indigo-700">P</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wide">Pickup</p>
                      <p className="text-xs text-gray-700 font-medium">{order.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 bg-teal-50 rounded-xl px-3 py-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center flex-shrink-0">
                      <MapPin size={11} className="text-teal-700" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-wide">Deliver to</p>
                      <p className="text-xs text-gray-700 font-medium">{order.delivery}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 text-right">Distance: {order.distance}</p>
                </div>

                {/* ── Step 1: Accept Order ── */}
                {state === "pending" && (
                  <button
                    disabled={!isActive}
                    onClick={() => setOrderState(order.id, "accepted")}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition
                      ${isActive
                        ? "bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white shadow-sm"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    <ClipboardList size={16} />
                    {isActive ? "Accept Order" : "Go Active to Accept"}
                  </button>
                )}

                {/* ── Step 2: Get Directions + OTP ── */}
                {state === "accepted" && (
                  <div className="flex flex-col gap-3">

                    {/* Get Directions */}
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-sm">
                      <Navigation size={16} />
                      Get Directions
                    </button>

                    {/* OTP section */}
                    <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock size={14} className="text-teal-600" />
                        <p className="text-xs font-bold text-gray-700">Enter Delivery OTP</p>
                      </div>
                      <p className="text-[11px] text-gray-400">Ask the customer for the OTP to confirm delivery.</p>

                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otpValues[order.id] || ""}
                          onChange={e => handleOtpChange(order.id, e.target.value)}
                          placeholder="Enter OTP"
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-center font-bold tracking-[0.3em] placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white"
                        />
                        <button
                          onClick={() => handleOtpSubmit(order.id)}
                          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition shadow-sm"
                        >
                          Submit
                        </button>
                      </div>

                      {otpError[order.id] && (
                        <p className="text-xs text-red-500 font-medium">{otpError[order.id]}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Delivered ── */}
                {state === "delivered" && (
                  <div className="flex flex-col items-center gap-2 py-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <CheckCircle2 size={36} className="text-emerald-500" />
                    <p className="text-sm font-bold text-emerald-700">Order Delivered!</p>
                    <p className="text-xs text-emerald-600">Great job! Earnings added to your wallet.</p>
                  </div>
                )}

              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default DeliveryOrders
