import { useRef, useState } from "react"
import {
  Camera,
  User,
  Phone,
  Mail,
  MapPin,
  Bike,
  Star,
  CheckCircle2,
  Edit3,
  Save,
  Package,
  X,
} from "lucide-react"

const DeliveryProfile = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [picPreview, setPicPreview] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    firstName: "Ravi",
    lastName: "Kumar",
    phone: "+91 98765 43210",
    email: "ravi.kumar@gmail.com",
    location: "Hyderabad, Telangana",
    vehicleType: "Motorcycle",
    vehicleNumber: "TS 09 AB 1234",
    experience: "2 years",
  })

  const [draft, setDraft] = useState({ ...form })

  const handlePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (picPreview) URL.revokeObjectURL(picPreview)
    setPicPreview(URL.createObjectURL(file))
  }

  const startEdit = () => {
    setDraft({ ...form })
    setEditing(true)
    setSaved(false)
  }

  const cancelEdit = () => {
    setEditing(false)
  }

  const saveEdit = () => {
    setForm({ ...draft })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const onChange = (key: keyof typeof draft, val: string) =>
    setDraft(prev => ({ ...prev, [key]: val }))

  const inputClass = (active: boolean) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition
    ${active
      ? "border-teal-400 focus:ring-2 focus:ring-teal-100 bg-white text-gray-800"
      : "border-transparent bg-gray-50 text-gray-700 cursor-default"}`

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">

        {/* ── Profile pic + name card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-5">

          {/* Pic */}
          <div className="relative flex-shrink-0">
            <div className="h-24 w-24 rounded-2xl bg-teal-100 border-2 border-teal-300 overflow-hidden flex items-center justify-center">
              {picPreview
                ? <img src={picPreview} className="w-full h-full object-cover" />
                : <User size={38} className="text-teal-500" />}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-2 -right-2 h-8 w-8 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white transition"
            >
              <Camera size={14} className="text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePic} />
          </div>

          {/* Identity */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800">{form.firstName} {form.lastName}</h2>
            <p className="text-sm text-teal-600 font-medium flex items-center gap-1">
              <Bike size={14} />
              Delivery Partner
            </p>

            {/* Rating + deliveries */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={13}
                    className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                ))}
                <span className="text-xs font-bold text-gray-700 ml-1">4.7</span>
              </div>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Package size={11} />
                218 deliveries
              </span>
            </div>
          </div>

          {/* Edit / Save buttons */}
          <div className="sm:ml-auto flex gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-50 transition"
                >
                  <X size={13} />
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition shadow-sm"
                >
                  <Save size={13} />
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold border border-teal-200 transition"
              >
                <Edit3 size={13} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Saved banner */}
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-sm font-semibold text-emerald-700">Profile updated successfully!</p>
          </div>
        )}

        {/* ── Personal Info ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
            <User size={15} className="text-teal-600" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              { label: "First Name",  key: "firstName",  icon: User,   type: "text" },
              { label: "Last Name",   key: "lastName",   icon: User,   type: "text" },
              { label: "Phone",       key: "phone",      icon: Phone,  type: "tel"  },
              { label: "Email",       key: "email",      icon: Mail,   type: "email"},
            ].map(({ label, key, icon: Icon, type }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <Icon size={12} className="text-teal-500" />
                  {label}
                </label>
                <input
                  type={type}
                  value={editing ? draft[key as keyof typeof draft] : form[key as keyof typeof form]}
                  onChange={e => onChange(key as keyof typeof draft, e.target.value)}
                  readOnly={!editing}
                  className={inputClass(editing)}
                />
              </div>
            ))}

            {/* Location — full width */}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-500" />
                Location / City
              </label>
              <input
                type="text"
                value={editing ? draft.location : form.location}
                onChange={e => onChange("location", e.target.value)}
                readOnly={!editing}
                className={inputClass(editing)}
              />
            </div>

          </div>
        </div>

        {/* ── Vehicle Info ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Bike size={15} className="text-teal-600" />
            Vehicle Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">Vehicle Type</label>
              {editing ? (
                <select
                  value={draft.vehicleType}
                  onChange={e => onChange("vehicleType", e.target.value)}
                  className="w-full border border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none bg-white transition"
                >
                  <option>Bicycle</option>
                  <option>Motorcycle</option>
                  <option>Scooter</option>
                  <option>Car</option>
                  <option>Electric Bike</option>
                </select>
              ) : (
                <input
                  readOnly
                  value={form.vehicleType}
                  className={inputClass(false)}
                />
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">Vehicle Number</label>
              <input
                type="text"
                value={editing ? draft.vehicleNumber : form.vehicleNumber}
                onChange={e => onChange("vehicleNumber", e.target.value)}
                readOnly={!editing}
                className={inputClass(editing)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">Experience</label>
              <input
                type="text"
                value={editing ? draft.experience : form.experience}
                onChange={e => onChange("experience", e.target.value)}
                readOnly={!editing}
                className={inputClass(editing)}
              />
            </div>

          </div>
        </div>

        {/* ── Rating breakdown ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Star size={15} className="text-amber-500" />
            Rating Breakdown
          </h3>

          <div className="flex flex-col sm:flex-row gap-5 items-center">

            {/* Big number */}
            <div className="flex flex-col items-center flex-shrink-0">
              <p className="text-5xl font-black text-gray-800">4.7</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14}
                    className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">218 ratings</p>
            </div>

            {/* Bars */}
            <div className="flex-1 w-full flex flex-col gap-2">
              {[
                { stars: 5, count: 130 },
                { stars: 4, count: 58 },
                { stars: 3, count: 18 },
                { stars: 2, count: 8 },
                { stars: 1, count: 4 },
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-5 text-right flex-shrink-0">{row.stars}</span>
                  <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${(row.count / 218) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 w-6 text-right flex-shrink-0">{row.count}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default DeliveryProfile
