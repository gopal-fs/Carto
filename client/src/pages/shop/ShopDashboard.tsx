import { ShoppingCart, Users, Star, DollarSign } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../../context/store"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"


const backend_url = import.meta.env.VITE_BACKEND_URL;
const ShopDashboard = () => {

  const { rating, orders, revenue, isRegistered, isApproved } = useSelector(
    (state: RootState) => state.shop
  );

  const [customer, setCustomer] = useState<number>(0);

  useEffect(() => {
    if (!isRegistered || !isApproved) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(backend_url + "/getusers", {
          withCredentials: true,
        });
        if (res?.data?.success) {
          setCustomer(res.data.message);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return toast.error(err.response?.data?.message || "Failed to Fetch Customers");
        }
      }
    };

    fetchData();
  }, [isRegistered, isApproved]);

  if (!isRegistered || !isApproved) {
    return <Navigate to="/shop/register" replace />;
  }
  return (

    <div>
      <div className="grid grid-cols-1 phone:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">


        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
            <ShoppingCart size={22} />
          </div>

          <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              {orders.length}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Today's Orders
            </span>
            
          </div>

        </div>


        {/* Pending Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-rose-100 text-rose-600 flex-shrink-0">
            <Users size={22} />
          </div>

          <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              {revenue}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Mothly Revenue
            </span>
            
          </div>

        </div>


        {/* Pre Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
            <Star size={22} />
          </div>

          <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              {customer}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Total Customers
            </span>
           
          </div>

        </div>


        {/* Wallet */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
            <DollarSign size={22} />
          </div>

          <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              {rating}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Rating
            </span>
            
          </div>

        </div>

      </div>
    </div>

  )
}

export default ShopDashboard