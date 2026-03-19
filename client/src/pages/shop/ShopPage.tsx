import { useRef, useState } from "react";
import banner1 from "../../assets/b1.jpg.jpeg";
import banner2 from "../../assets/b2.jpg.jpeg";
import banner3 from "../../assets/b5.jpg.jpeg";
import profile from "../../assets/p1.jpg.jpeg";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Star,
  X,
} from "lucide-react";


/* ─── types ─────────────────────────────────────── */
type ContactInfo = { phone: string; email: string; address: string };
type ShopInfo = {
  name: string;
  category: string;
  location: string;
  isOpen: boolean;
  rating: string;
  contact: ContactInfo;
};

/* ─── component ──────────────────────────────────── */
const ShopInfo = () => {
  /* banners */
  const [banners, setBanners] = useState<string[]>([banner1, banner2, banner3]);
  const [slide, setSlide] = useState(0);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  /* profile */
  const [profileImg, setProfileImg] = useState<string>(profile);
  const profileInputRef = useRef<HTMLInputElement>(null);

  /* shop info */
  const [info, setInfo] = useState<ShopInfo>({
    name: "Raghavendra Kirana Stores",
    category: "Kirana Store",
    location: "Tadepalligudem",
    isOpen: true,
    rating: "4.5",
    contact: {
      phone: "6302176979",
      email: "gopalpinapathuni.2022@gmail.com",
      address: "Tadepalligudem",
    },
  });
  const [draft, setDraft] = useState<ShopInfo>(info);
  const [editMode, setEditMode] = useState(false);

  /* tab */
  

  /* ── banner handlers ── */
  const nextSlide = () => setSlide((p) => (p + 1) % banners.length);
  const prevSlide = () => setSlide((p) => (p - 1 + banners.length) % banners.length);

  const addBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBanners((prev) => [...prev, URL.createObjectURL(file)]);
    e.target.value = "";
  };

  const removeBanner = (idx: number) => {
    setBanners((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (slide >= next.length) setSlide(Math.max(0, next.length - 1));
      return next;
    });
  };

  /* ── profile handler ── */
  const changeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImg(URL.createObjectURL(file));
    e.target.value = "";
  };

  /* ── info edit helpers ── */
  const patchDraft = (key: keyof ShopInfo, value: string | boolean) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const patchContact = (key: keyof ContactInfo, value: string) =>
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));

  const saveInfo = () => {
    setInfo(draft);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setDraft(info);
    setEditMode(false);
  };

  /* ── shared input classes ── */
  const inputCls =
    "border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-full transition";

  return (
    <div className="min-h-screen w-full">
      {/* ── Edit / Save bar ── */}
      <div className="flex justify-end px-4 py-2 gap-2">
        {editMode ? (
          <>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <X size={14} /> Cancel
            </button>
            <button
              onClick={saveInfo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              <Save size={14} /> Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => { setDraft(info); setEditMode(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Pencil size={14} /> Edit Shop Info
          </button>
        )}
      </div>

      {/* ── Banner ── */}
      <div className="relative w-full">
        <div className="relative h-[30vh] w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {banners.map((img, idx) => (
              <div key={idx} className="relative w-full shrink-0 h-full">
                <img src={img} className="w-full h-full object-cover" />
                {editMode && banners.length > 1 && (
                  <button
                    onClick={() => removeBanner(idx)}
                    className="absolute top-2 right-2 bg-white/90 border border-gray-200 rounded-full p-1 hover:bg-red-50 hover:border-red-300 transition shadow"
                  >
                    <X size={14} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
            <ChevronLeft onClick={prevSlide} className="cursor-pointer drop-shadow" size={35} />
            <ChevronRight onClick={nextSlide} className="cursor-pointer drop-shadow" size={35} />
          </div>

          {/* Add banner button */}
          {editMode && (
            <button
              onClick={() => bannerInputRef.current?.click()}
              className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 border border-gray-200 px-2 py-1 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition shadow"
            >
              <Plus size={13} /> Add Banner
            </button>
          )}
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={addBanner} />
        </div>

        {/* ── Profile pic ── */}
        <div
          className="border-3 border-[#4f46e5] rounded-full h-37.5 w-37.5 absolute -bottom-22.5 sm:-bottom-35 sm:h-50 sm:w-50 left-6 p-0.75 bg-white"
          onClick={() => editMode && profileInputRef.current?.click()}
        >
          <img src={profileImg} className="h-full w-full rounded-full object-cover" alt="profile" />
          {editMode && (
            <div className="absolute inset-0.75 rounded-full bg-black/30 flex items-center justify-center cursor-pointer">
              <Pencil size={24} className="text-white" />
            </div>
          )}
          <input ref={profileInputRef} type="file" accept="image/*" className="hidden" onChange={changeProfile} />
        </div>
      </div>

      {/* ── Shop name + details ── */}
      <div className="mt-27.5 sm:mt-40 flex flex-col gap-3 pl-8 pr-4">
        {/* Name */}
        {editMode ? (
          <input
            value={draft.name}
            onChange={(e) => patchDraft("name", e.target.value)}
            className="text-gray-800 font-bold text-xl sm:text-4xl border-b-2 border-blue-400 outline-none bg-transparent w-full max-w-xl"
          />
        ) : (
          <h1 className="text-gray-800 font-bold text-xl sm:text-4xl">{info.name}</h1>
        )}

        {/* Category badge */}
        {editMode ? (
          <input
            value={draft.category}
            onChange={(e) => patchDraft("category", e.target.value)}
            className={`${inputCls} w-45 text-center`}
            placeholder="Category"
          />
        ) : (
          <span className="bg-(--success) py-0.75 px-2.25 w-max text-white font-normal text-sm rounded-full">
            {info.category}
          </span>
        )}

        <div className="flex flex-col gap-3 pr-3 lg:flex-row">
          {/* ── Info cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full flex-1 gap-4 mb-6">
            {/* Location */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl truncate">
              <MapPin className="text-blue-400 shrink-0" />
              <div className="flex flex-col w-full">
                <p className="text-gray-500 text-sm">Location</p>
                {editMode ? (
                  <input
                    value={draft.location}
                    onChange={(e) => patchDraft("location", e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <p className="font-medium">{info.location}</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl">
              <Clock className="text-green-400 shrink-0" />
              <div className="flex flex-col w-full gap-1">
                <p className="text-gray-500 text-sm">Status</p>
                {editMode ? (
                  <button
                    onClick={() => patchDraft("isOpen", !draft.isOpen)}
                    className={`px-3 py-1 rounded-full text-xs font-medium w-fit transition ${
                      draft.isOpen
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {draft.isOpen ? "Open — click to close" : "Closed — click to open"}
                  </button>
                ) : (
                  <p className={`font-medium ${info.isOpen ? "text-green-400" : "text-red-500"}`}>
                    {info.isOpen ? "Open" : "Closed"}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3 p-4 h-max bg-gray-50 rounded-xl">
              <Star className="text-yellow-500 shrink-0" />
              <div className="flex flex-col w-full">
                <p className="text-gray-500 text-sm">Rating</p>
                {editMode ? (
                  <input
                    value={draft.rating}
                    onChange={(e) => patchDraft("rating", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 4.5"
                  />
                ) : (
                  <p className="font-medium">{info.rating}/5.0</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Contact card ── */}
          <div className="flex flex-col gap-2 w-full max-w-100">
            <div className="bg-blue-50 p-3 rounded flex flex-col gap-2">
              <h1 className="text-sm font-medium text-gray-700">Contact Info</h1>

              <div className="flex gap-1 items-center">
                <Phone size={18} className="text-blue-400 shrink-0" />
                {editMode ? (
                  <input
                    value={draft.contact.phone}
                    onChange={(e) => patchContact("phone", e.target.value)}
                    className={inputCls}
                    placeholder="Phone"
                  />
                ) : (
                  <p className="text-gray-700">{info.contact.phone}</p>
                )}
              </div>

              <div className="flex gap-1 items-center truncate">
                <Mail size={18} className="text-blue-400 shrink-0" />
                {editMode ? (
                  <input
                    value={draft.contact.email}
                    onChange={(e) => patchContact("email", e.target.value)}
                    className={inputCls}
                    placeholder="Email"
                  />
                ) : (
                  <p className="text-gray-700 truncate">{info.contact.email}</p>
                )}
              </div>

              <div className="flex gap-1 items-center">
                <MapPin size={18} className="text-blue-400 shrink-0" />
                {editMode ? (
                  <input
                    value={draft.contact.address}
                    onChange={(e) => patchContact("address", e.target.value)}
                    className={inputCls}
                    placeholder="Address"
                  />
                ) : (
                  <p className="text-gray-700">{info.contact.address}</p>
                )}
              </div>
            </div>

            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ShopInfo;
