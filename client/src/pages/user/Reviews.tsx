import { Star } from "lucide-react";

const Reviews = () => {

  return (

    <div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

      



      {/* REVIEW LIST */}

      <div className="space-y-4">


        {/* SINGLE REVIEW */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          {/* REVIEW HEADER */}

          <div className="flex items-center justify-between mb-3">

            <div className="flex items-center gap-3">

              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-10 h-10 rounded-full"
              />

              <div>

                <p className="font-semibold text-gray-800">
                  Ravi Kumar
                </p>

                <p className="text-xs text-gray-500">
                  12 Mar 2026 • Verified Order
                </p>

              </div>

            </div>


            {/* Rating */}

            <div className="flex text-yellow-400">

              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 text-gray-300" />

            </div>

          </div>



          {/* REVIEW TEXT */}

          <p className="text-gray-700 leading-relaxed">

            Pickles quality chala bagundi. Mango pickle taste
            home made laga undi. Packaging kuda neat ga vachindi.
            Definitely malli order chestanu.

          </p>

        </div>


      </div>

    </div>

  );

};

export default Reviews;