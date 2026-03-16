import { CalendarDays, Handbag, Hourglass, WalletMinimal } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 w-full h-full overflow-y-auto">

      {/* Order Stats */}
      <div className="grid grid-cols-1 phone:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

        
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
            <Handbag size={22} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Total Orders
            </span>
            <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              245
            </span>
          </div>

        </div>


        {/* Pending Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-rose-100 text-rose-600 flex-shrink-0">
            <Hourglass size={22} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Pending Orders
            </span>
            <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              12
            </span>
          </div>

        </div>


        {/* Pre Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-violet-100 text-violet-600 flex-shrink-0">
            <CalendarDays size={22} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Pre Orders
            </span>
            <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              8
            </span>
          </div>

        </div>


        {/* Wallet */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition">

          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
            <WalletMinimal size={22} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm text-gray-500 font-medium truncate">
              Wallet Balance
            </span>
            <span className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
              ₹5,420
            </span>
          </div>

        </div>

      </div>

      {/* Ongoing Orders */}
      <div className="w-full max-w-[600px] border-1 h-[350px] overflow-y-scroll border-gray-300 mt-3 rounded p-2">
        <h1>Ongoing Orders</h1>
        <hr className="w-full border-1 mt-2 border-gray-300" />
        <div className="border-gray-300/60 mt-2 w-full border-1 rounded p-2">
        <h1 className="text-gray-600 text-sm">Order #1024</h1>
        <span className="text-sm text-black">Out for Delivery</span>
        <div className="h-[10px] w-full border-1 border-gray-300/60 rounded-full mt-2 relative">
          <div className="absolute top-0 transition-all duration-300 bottom-0 rounded-full left-0 bg-[var(--success)] w-[100px]"></div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-[var(--secondary)] rounded text-white h-[36px] w-[120px] mt-3 cursor-pointer hover:bg-[var(--secondary)]/92">Track Order</button>
        </div>
        </div>
        <div className="border-gray-300/60 mt-2 w-full border-1 rounded p-2">
        <h1 className="text-gray-600 text-sm">Order #1024</h1>
        <span className="text-sm text-black">Out for Delivery</span>
        <div className="h-[10px] w-full border-1 border-gray-300/60 rounded-full mt-2 relative">
          <div className="absolute top-0 transition-all duration-300 bottom-0 rounded-full left-0 bg-[var(--success)] w-[100px]"></div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-[var(--secondary)] rounded text-white h-[36px] w-[120px] mt-3 cursor-pointer hover:bg-[var(--secondary)]/92">Track Order</button>
        </div>
        </div>
        <div className="border-gray-300/60 mt-2 w-full border-1 rounded p-2">
        <h1 className="text-gray-600 text-sm">Order #1024</h1>
        <span className="text-sm text-black">Out for Delivery</span>
        <div className="h-[10px] w-full border-1 border-gray-300/60 rounded-full mt-2 relative">
          <div className="absolute top-0 transition-all duration-300 bottom-0 rounded-full left-0 bg-[var(--success)] w-[100px]"></div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-[var(--secondary)] rounded text-white h-[36px] w-[120px] mt-3 cursor-pointer hover:bg-[var(--secondary)]/92">Track Order</button>
        </div>
        </div>


      </div>
      {/* Orders List */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">

  {/* Monthly List */}
  <div className="flex-1 bg-white border border-gray-300 rounded-xl p-5 shadow-sm">

    <h2 className="text-sm font-semibold text-gray-700 mb-4">
      Monthly List
    </h2>

    <div className="flex flex-col h-[150px] scrollbar-visible overflow-y-scroll  divide-y divide-gray-200">

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Grocery Combo Pack
        </span>
        <span className="text-xs text-gray-500">
          120 orders
        </span>
      </div>
      
      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Grocery Combo Pack
        </span>
        <span className="text-xs text-gray-500">
          120 orders
        </span>
      </div>

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Monthly Vegetable Kit
        </span>
        <span className="text-xs text-gray-500">
          95 orders
        </span>
      </div>

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Kitchen Essentials Pack
        </span>
        <span className="text-xs text-gray-500">
          70 orders
        </span>
      </div>

    </div>

    <div className="w-full flex justify-center items-center">
    <button className="bg-[var(--secondary)] rounded text-white h-[36px] w-[120px] mt-3 cursor-pointer hover:bg-[var(--secondary)]/92">Browse more..</button>

    </div>

  </div>


  {/* Daily List */}
  <div className="flex-1 bg-white border border-gray-300 rounded-xl p-5 shadow-sm">

    <h2 className="text-sm font-semibold text-gray-700 mb-4">
      Daily List
    </h2>

    <div className="flex flex-col h-[150px] overflow-y-scroll divide-y divide-gray-200">

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Fresh Milk Pack
        </span>
        <span className="text-xs text-gray-500">
          35 orders
        </span>
      </div>

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Morning Bakery Combo
        </span>
        <span className="text-xs text-gray-500">
          22 orders
        </span>
      </div>

      <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition">
        <span className="text-sm text-gray-700 truncate">
          Daily Fruits Basket
        </span>
        <span className="text-xs text-gray-500">
          18 orders
        </span>
      </div>

    </div>

    <div className="w-full flex justify-center items-center">
    <button className="bg-[var(--secondary)] rounded text-white h-[36px] w-[120px] mt-3 cursor-pointer hover:bg-[var(--secondary)]/92">Browse more..</button>

    </div>

  </div>

      </div>


    </div>
  );
};

export default Dashboard;