import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../context/store";


const ShopInfo = () => {
  const {
    shop_name,
    shop_type,
    rating,
    location,
    status,
    email,
    number,
    address,
    profile,
    image1,
    image2,
    image3,
  } = useSelector((state: RootState) => state.shop);

  const banners = [image1, image2, image3].filter(
    (img): img is string => Boolean(img)
  );

  const [slide, setSlide] = useState(0);

  const nextSlide = () =>
    setSlide((p) => (banners.length === 0 ? 0 : (p + 1) % banners.length));
  const prevSlide = () =>
    setSlide((p) =>
      banners.length === 0 ? 0 : (p - 1 + banners.length) % banners.length
    );

  return (
    <div className="min-h-screen w-full">
      {/* Banner */}
      <div className="relative w-full">
        <div className="relative h-[30vh] w-full overflow-hidden">
          {banners.length > 0 ? (
            <div
              className="flex h-full transition-transform duration-500"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {banners.map((img, idx) => (
                <div key={idx} className="relative w-full shrink-0 h-full">
                  <img src={img} className="w-full h-full object-cover" alt={`banner-${idx + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full bg-gray-100" />
          )}

          {banners.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
              <ChevronLeft
                onClick={prevSlide}
                className="cursor-pointer drop-shadow"
                size={35}
              />
              <ChevronRight
                onClick={nextSlide}
                className="cursor-pointer drop-shadow"
                size={35}
              />
            </div>
          )}
        </div>

        {/* Profile pic */}
        <div className="border-3 border-[#4f46e5] rounded-full h-37.5 w-37.5 absolute -bottom-22.5 sm:-bottom-35 sm:h-50 sm:w-50 left-6 p-0.75 bg-white">
          {profile ? (
            <img
              src={profile}
              className="h-full w-full rounded-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-200" />
          )}
        </div>
      </div>

      {/* Shop name + details */}
      <div className="mt-27.5 sm:mt-40 flex flex-col gap-3 pl-8 pr-4">
        <h1 className="text-gray-800 font-bold text-xl sm:text-4xl">
          {shop_name ?? ""}
        </h1>

        <span className="bg-(--success) py-0.75 px-2.25 w-max text-white font-normal text-sm rounded-full">
          {shop_type ?? ""}
        </span>

        <div className="flex flex-col gap-3 pr-3 lg:flex-row">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full flex-1 gap-4 mb-6">
            {/* Location */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl truncate">
              <MapPin className="text-blue-400 shrink-0" />
              <div className="flex flex-col w-full">
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-medium">{location ?? "—"}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl">
              <Clock className="text-green-400 shrink-0" />
              <div className="flex flex-col w-full gap-1">
                <p className="text-gray-500 text-sm">Status</p>
                <p
                  className={`font-medium ${
                    status === "open" ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {status === "open" ? "Open" : "Closed"}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl">
              <Star className="text-yellow-500 shrink-0" />
              <div className="flex flex-col w-full">
                <p className="text-gray-500 text-sm">Rating</p>
                <p className="font-medium">{rating}/5.0</p>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="flex flex-col gap-2 w-full max-w-100">
            <div className="bg-blue-50 p-3 rounded flex flex-col gap-2">
              <h1 className="text-sm font-medium text-gray-700">Contact Info</h1>

              <div className="flex gap-1 items-center">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <p className="text-gray-700">{number ?? "—"}</p>
              </div>

              <div className="flex gap-1 items-center truncate">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <p className="text-gray-700 truncate">{email ?? "—"}</p>
              </div>

              <div className="flex gap-1 items-center">
                <MapPin size={18} className="text-blue-400 shrink-0" />
                <p className="text-gray-700">{address ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
