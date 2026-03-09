import { Wallet as walletIcon, ArrowDownLeft, ArrowUpRight, WalletIcon } from "lucide-react";

const Wallet = () => {

return (

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

{/* PAGE TITLE */}

<h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
Wallet

</h1>


{/* WALLET BALANCE CARD */}

<div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-6">

<div className="flex items-center justify-between">

<div>

<p className="text-sm opacity-80">
Available Balance
</p>

<h2 className="text-3xl font-bold mt-1">
₹1,250.00
</h2>

</div>

<div className="bg-white/20 p-3 rounded-full">
<WalletIcon className="w-6 h-6"/>
</div>

</div>


{/* ACTION BUTTONS */}

<div className="flex gap-3 mt-6">

<button className="bg-white cursor-pointer text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
Add Money
</button>


</div>

</div>



{/* TRANSACTIONS */}

<div className="bg-white border border-gray-200 rounded-xl p-5">

<h2 className="font-semibold text-gray-800 mb-4">
Transaction History
</h2>


{/* TRANSACTION ITEM */}

<div className="flex items-center justify-between py-3 border-b border-gray-100">

<div className="flex items-center gap-3">

<div className="bg-green-100 p-2 rounded-full">
<ArrowDownLeft className="w-4 h-4 text-green-600"/>
</div>

<div>

<p className="font-medium text-gray-800">
Order Cashback
</p>

<p className="text-xs text-gray-500">
12 Mar 2026
</p>

</div>

</div>

<span className="text-green-600 font-semibold">
+ ₹50
</span>

</div>


{/* TRANSACTION ITEM */}

<div className="flex items-center justify-between py-3 border-b border-gray-100">

<div className="flex items-center gap-3">

<div className="bg-red-100 p-2 rounded-full">
<ArrowUpRight className="w-4 h-4 text-red-600"/>
</div>

<div>

<p className="font-medium text-gray-800">
Order Payment
</p>

<p className="text-xs text-gray-500">
10 Mar 2026
</p>

</div>

</div>

<span className="text-red-600 font-semibold">
- ₹200
</span>

</div>


{/* TRANSACTION ITEM */}

<div className="flex items-center justify-between py-3">

<div className="flex items-center gap-3">

<div className="bg-green-100 p-2 rounded-full">
<ArrowDownLeft className="w-4 h-4 text-green-600"/>
</div>

<div>

<p className="font-medium text-gray-800">
Wallet Top-up
</p>

<p className="text-xs text-gray-500">
8 Mar 2026
</p>

</div>

</div>

<span className="text-green-600 font-semibold">
+ ₹500
</span>

</div>


</div>

</div>

);
};

export default Wallet;