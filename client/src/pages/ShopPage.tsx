import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Phone, Mail, MapPin, Star } from "lucide-react";

const ShopPage = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">

      {/* CAROUSEL */}

      <div className="relative">

        <div className="h-[260px] w-full overflow-hidden">

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            className="h-full"
          >

            <SwiperSlide>
              <img
                src="/logo.png"
                className="h-full w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="/logosym.png"
                className="h-full w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="/logo.png"
                className="h-full w-full object-cover"
              />
            </SwiperSlide>

          </Swiper>

        </div>


        {/* SHOP PROFILE */}

        <div className="absolute left-6 -bottom-12">

          <div className="w-24 h-24 rounded-xl border-4 border-white overflow-hidden bg-gray-200">

            <img
              src="/logo.jpg"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>


      {/* SHOP INFO */}

      <div className="bg-white pt-16 px-6 pb-6 border-b border-gray-200">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

          <div>

            <h1 className="text-xl font-semibold text-gray-800">
              Kumari Pickles
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">

              <span className="flex items-center gap-1">
                <MapPin size={16} /> Vijayawada
              </span>

              <span className="text-green-600 font-medium">
                Open
              </span>

              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500" /> 4.2
              </span>

            </div>

          </div>


          <div className="flex flex-col gap-2 text-sm">

            <span className="flex items-center gap-2">
              <Phone size={16} /> 9876543210
            </span>

            <span className="flex items-center gap-2">
              <Mail size={16} /> kumaripickles@gmail.com
            </span>

            <button className="bg-black text-white px-4 py-2 rounded-md mt-2 hover:opacity-90">
              Book / Pre Order
            </button>

          </div>

        </div>


        <button className="mt-4 border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100">

          <Phone size={16} /> Call Now

        </button>

      </div>



      {/* FLASH SALE */}

      <section className="px-6 py-6">

        <h2 className="text-lg font-semibold mb-4">
          Flash Sale
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow">

            Mango Pickle

            <p className="text-green-600 font-medium">
              ₹150
            </p>

          </div>

        </div>

      </section>



      {/* PRODUCTS */}

      <section className="px-6 py-6">

        <h2 className="text-lg font-semibold mb-4">
          Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow">

            Lemon Pickle

            <p className="text-gray-700">
              ₹120
            </p>

          </div>

        </div>

      </section>



      {/* REVIEWS */}

      <section className="px-6 py-6">

        <h2 className="text-lg font-semibold mb-4">
          Reviews
        </h2>

        <div className="bg-white border border-gray-200 p-4 rounded-lg">

          <p className="text-sm text-gray-700">
            Very tasty homemade pickles. Packaging also good.
          </p>

          <div className="flex items-center gap-2 mt-2 text-sm">

            <span className="font-medium">
              Ravi
            </span>

            <span className="flex items-center gap-1 text-yellow-500">
              <Star size={14} /> 4
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ShopPage;