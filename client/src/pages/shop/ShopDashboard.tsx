import { ShoppingCart, Users, Star, DollarSign } from "lucide-react"

const ShopDashboard = () => {
  return (

    <div>
      <div className="grid grid-cols-1 phone:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">


        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
            <ShoppingCart size={22} />
          </div>

          <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              0
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
              45K
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
              125
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
              4.6
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