import { useState } from "react"
import banner1 from "../../assets/b1.jpg.jpeg";
import banner2 from "../../assets/b2.jpg.jpeg";
import banner3 from "../../assets/b5.jpg.jpeg";
import profile from "../../assets/p1.jpg.jpeg"
import { ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import Products from "../../components/Products";


const ShopPage = () => {

  const images = [banner1, banner2, banner3];
  const [imageCount, setImageCount] = useState(0);
  const [tab,setTab]=useState<string>("products");

  const next = () => {
    setImageCount((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setImageCount((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen w-full">
      
      <div className="relative w-full">
        <div className="relative h-[30vh] w-full overflow-hidden">

        {/* Sliding container */}
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${imageCount * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
          <ChevronLeft onClick={prev} className="cursor-pointer" size={35} />
          <ChevronRight onClick={next} className="cursor-pointer" size={35} />
        </div>

        </div>
        <div className="border-3 border-[#4f46e5] rounded-full h-[150px] w-[150px] absolute bottom-[-90px] sm:bottom-[-140px] sm:h-[200px] sm:w-[200px] left-6 p-[3px]">
          <img src={profile} className="h-full w-full rounded-full" alt="profile" />
        </div>
      </div>
      <div className="mt-[110px] sm:mt-[160px] flex flex-col gap-3 pl-8">
        <h1 className="text-gray-800 font-bold text-xl sm:text-4xl">Raghavendra Kirana Stores</h1>
        <span className="bg-[var(--success)] py-[3px] px-[9px] w-[max-content]  text-white font-normal text-sm rounded-full">Kirana Store</span>
        <div className="flex flex-col gap-3 pr-3 lg:flex-row">
          {/*Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full flex-1 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-4 h-[max-content] bg-gray-50 rounded-xl truncate">
            <MapPin className="text-blue-400" />
              <div className="flex flex-col">
                <p className="text-gray-500">Location</p>
                <p className="font-medium">Tadepalligudem</p>
              </div>
            </div>
         
       
            <div className="flex items-center space-x-3 p-4 h-[max-content] bg-gray-50 rounded-xl truncate">
            <Clock className="text-green-400" />
              <div className="flex flex-col">
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-green-400">Open</p>
              </div>
            </div>
         
          
            <div className="flex items-center space-x-3 p-4 h-[max-content] bg-gray-50 rounded-xl truncate">
            <Star className="text-yellow-500" />
              <div className="flex flex-col">
              <p className="text-gray-500">Rating</p>
              <p className="font-medium">4.5/5.0</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[100%] max-w-[400px]">
            <div className="bg-blue-50 p-3 rounded flex flex-col gap-2">
              <h1 className="text-sm">Contact Info</h1>
              <div className="flex gap-1 items-center">
                <Phone size={18} className="text-blue-400" />
                <p className="text-gray-700">6302176979</p>
              </div>
              <div className="flex gap-1 items-center truncate">
                <Mail size={18} className="text-blue-400" />
                <p className="text-gray-700">gopalpinapathuni.2022@gmail.com</p>
              </div>
              <div className="flex gap-1 items-center">
                <Phone size={18} className="text-blue-400" />
                <p className="text-gray-700">Tadepalligudem</p>
              </div>
            </div>
            <button className="w-full h-[40px] text-white bg-green-600 rounded-xl cursor-pointer">Book/Pre Order Items</button>
            <button className="w-full h-[40px] text-white bg-emerald-600 cursor-pointer rounded-xl">Call Now</button>
          </div>
        </div>
      </div>

      {/* Sales and Reviews */}
      <div className="px-3 mt-5">
          <div className="border-b flex gap-5 border-gray-200">
            <span onClick={()=>setTab("products")} className={`py-4 px-1  font-medium text-sm capitalize cursor-pointer transition-colors ${tab==="products"?'border-b-2 border-blue-500 text-blue-600':'text-gray-500'}`}>Products</span>
            <span onClick={()=>setTab("sale")} className={`py-4 px-1  font-medium text-sm capitalize cursor-pointer transition-colors ${tab==="sale"?'border-b-2 border-blue-500 text-blue-600':'text-gray-500'}`}>Flash Sale</span>

            <span onClick={()=>setTab("reviews")} className={`py-4 px-1  font-medium text-sm capitalize cursor-pointer transition-colors ${tab==="reviews"?'border-b-2 border-blue-500 text-blue-600':'text-gray-500'}`}>Reviews</span>


          </div>
      </div>

      {tab==="products" && (
        <div className="pb-5 px-3 mt-3 flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start flex-wrap gap-3">
          <Products />
          <Products />
        </div>
      )}

    {tab==="sale" && (
        <div className="pb-5 px-3 mt-3 flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start flex-wrap gap-3">
        <Products />
        <Products />
      </div>
      )}

    {tab==="reviews" && (
        <div className="min-h-[200px] flex flex-col justify-center items-center w-full px-3">
          <h1>No Reviews Yet</h1>
        </div>
      )}

    </div>
  );
};

export default ShopPage;