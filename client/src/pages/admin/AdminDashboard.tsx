import { useEffect, useState } from "react"
import {
  Users,
  Store,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  XCircle,
  MapPin,
  Mail,
  Clock,
} from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

type PendingShop = {
  shop_id: string,
  shop_type: string,
  email: string,
  shop_name: string,
  location: string,
  profile: string,
  createdAt: string
}



const recentUsers = [
  { name: "Arjun Mehta",   email: "arjun.mehta@gmail.com",   joined: "19 Mar 2026",  orders: 5  },
  { name: "Priya Singh",   email: "priya.singh@gmail.com",   joined: "18 Mar 2026",  orders: 3  },
  { name: "Rahul Kumar",   email: "rahulkumar99@gmail.com",  joined: "18 Mar 2026",  orders: 8  },
  { name: "Ananya Shah",   email: "ananya.shah@gmail.com",   joined: "17 Mar 2026",  orders: 2  },
  { name: "Vikram Reddy",  email: "vikram.r@gmail.com",      joined: "16 Mar 2026",  orders: 11 },
]

const stats = [
  { label: "Total Users",  value: "1,284", icon: Users,        color: "indigo" },
  { label: "Total Shops",  value: "96",    icon: Store,        color: "emerald" },
  { label: "Total Orders", value: "4,730", icon: ShoppingCart, color: "amber" },
  { label: "Revenue",      value: "₹8.2L", icon: TrendingUp,   color: "violet" },
]

const iconColor: Record<string, string> = {
  indigo:  "bg-indigo-100 text-indigo-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber:   "bg-amber-100 text-amber-600",
  violet:  "bg-violet-100 text-violet-600",
}


const backend_url = import.meta.env.VITE_BACKEND_URL;
const AdminDashboard = () => {
  

  const [pendingShops,setPendingShops]=useState<PendingShop []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(backend_url + "/shop/getPendingShops", {
          withCredentials: true,
        });
        if (res.data.success) {

          setPendingShops(res.data.shopsList ?? []);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return toast.error(err.response?.data?.message || "Failed to Load Shops");
        }
        return toast.error("Failed to Load Shops");
      }
    };
    fetchData();
  }, []);

  const handleAction = async (shop_id: string, action: "approved" | "rejected") => {
    try {
      const ans = action === "approved";

      const res = await axios.patch(
        backend_url + "/admin/updateShopStatus",
        { shop_id, ans },
        { withCredentials: true }
      );

      if (res.data.success) {
        setPendingShops(prev => prev.filter(s => s.shop_id !== shop_id));
        return toast.success(res.data.message || "Status Updated");
      }
      toast.error(res.data.message || "Failed To Update");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return toast.error(err.response?.data?.message || "Failed To Update");
      }
      toast.error("Failed To Update");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-6">

      {/* ── Page title ── */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of the platform</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 phone:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className={`h-12 w-12 flex items-center justify-center rounded-xl flex-shrink-0 ${iconColor[stat.color]}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-gray-800 text-sm">Shop Approvals</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {pendingShops.length} shop{pendingShops.length !== 1 ? "s" : ""} pending review
              </p>
            </div>
            {pendingShops.length > 0 && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                <Clock size={11} />
                Pending
              </span>
            )}
          </div>

          {pendingShops.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
              <CheckCircle2 size={36} className="text-emerald-400 opacity-60" />
              <p className="text-sm font-semibold text-gray-500">All caught up!</p>
              <p className="text-xs">No pending shop approvals.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingShops.map(shop => {
                
                return (
                  <div
                    key={shop.shop_id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 transition`}
                  >
                    
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                        <img src={shop.profile} className="h-7 w-7 object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{shop.shop_name}</p>
                        <p className="text-xs text-indigo-500 font-medium truncate">{shop.shop_type}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <Mail size={10} />
                            {shop.email}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <MapPin size={10} />
                            {shop.location}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-300 mt-0.5 flex items-center gap-1">
                          <Clock size={9} />
                          {new Date(shop.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                    <button
                            onClick={() => handleAction(shop.shop_id, "approved")}
                            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                          >
                            <CheckCircle2 size={13} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(shop.shop_id, "rejected")}
                            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 border border-red-200 text-red-500 rounded-xl text-xs font-bold transition"
                          >
                            <XCircle size={13} />
                            Reject
                          </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Section 2 — Recent Users */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-sm">Recent Users</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest registered accounts</p>
          </div>

          <div className="divide-y divide-gray-100">
            {recentUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition">
                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-indigo-600">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] text-gray-400">{user.joined}</p>
                  <p className="text-[11px] text-indigo-500 font-semibold">{user.orders} orders</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
