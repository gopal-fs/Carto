import { Heart, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShopCard = () => {

  const navigate=useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText("9876543210");
    alert("Phone number copied!");
  };

  return (
    <div className="p-3 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
       <div className="w-[100%] flex-1 max-w-[360px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">

{/* Image Section */}
<div className="relative">
  <img
    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    alt="shop"
    className="w-full h-[180px] object-cover"
  />

  {/* Status Badge */}
  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
    Open
  </span>

  {/* Rating */}
  <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow font-semibold">
    ⭐ 4.6
  </span>
</div>

{/* Content */}
<div className="p-4 flex flex-col gap-2">

  {/* Shop Name */}
  <h3 className="text-lg font-semibold text-gray-800">
    Krishna Grocery Store
  </h3>

  {/* Shop Type */}
  <p className="text-sm text-gray-500">
    Grocery 
  </p>

  {/* Buttons */}
  <div className="flex items-center justify-between mt-3">

    <button onClick={()=>navigate('id')} className="bg-blue-600 cursor-pointer w-[120px] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800/80 transition">
      View Shop
    </button>

    <div className="flex items-center gap-2">
    <button
      
      className="border cursor-pointer border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition"
    >
      <Heart className="text-red-500 fill-red-500" size={18} />
    </button>
    <button
      onClick={handleCopy}
      className="border cursor-pointer border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition"
    >
      <Phone size={18} />
    </button>
    </div>

  </div>
</div>
</div>



    </div>
   
  );
};

export default ShopCard;