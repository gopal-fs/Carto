import React, { useRef, useState } from 'react'
import {
  ImagePlus,
  X,
  Tag,
  FileText,
  ListChecks,
  PackagePlus,
  Layers,
  Scale,
  Coins,
} from 'lucide-react'

type MeasurementType = 'piece' | 'kg' | 'litre' | ''

interface KgPrices {
  g100: string
  g250: string
  g500: string
  kg1: string
}

interface LitrePrices {
  ml100: string
  ml250: string
  ml500: string
  l1: string
}

const priceInputCls =
  'w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition'

const PriceField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-gray-500">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? '0.00'}
        min="0"
        step="0.01"
        required
        className={priceInputCls}
      />
    </div>
  </div>
)

const VendorAddProduct = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [keyFeatures, setKeyFeatures] = useState('')
  const [measurement, setMeasurement] = useState<MeasurementType>('')
  const [piecePrice, setPiecePrice] = useState('')
  const [kgPrices, setKgPrices] = useState<KgPrices>({ g100: '', g250: '', g500: '', kg1: '' })
  const [litrePrices, setLitrePrices] = useState<LitrePrices>({ ml100: '', ml250: '', ml500: '', l1: '' })
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const isPricesFilled = () => {
    if (!measurement) return false
    if (measurement === 'piece') return piecePrice.trim() !== ''
    if (measurement === 'kg') return Object.values(kgPrices).every(v => v.trim() !== '')
    if (measurement === 'litre') return Object.values(litrePrices).every(v => v.trim() !== '')
    return false
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isPricesFilled()) return

    const pricing =
      measurement === 'piece'
        ? { piece: piecePrice }
        : measurement === 'kg'
        ? kgPrices
        : litrePrices

    console.log({ name, category, description, keyFeatures, measurement, pricing })
  }

  const inputCls =
    'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition'

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <PackagePlus size={22} className="text-indigo-600" />
            Add New Product
          </h1>
          <p className="text-sm text-gray-400 mt-1">List a wholesale product for shops to order</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6"
        >

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <ImagePlus size={15} className="text-indigo-600" />
              Product Image
            </label>
            {preview ? (
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-red-50 hover:border-red-300 transition"
                >
                  <X size={16} className="text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-48 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <ImagePlus size={32} className="text-gray-300" />
                <span className="text-sm text-gray-400">Click to upload product image</span>
                <span className="text-xs text-gray-300">PNG, JPG, WEBP supported</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Tag size={14} className="text-indigo-600" />
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Basmati Rice"
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Layers size={14} className="text-indigo-600" />
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                className={`${inputCls} bg-white`}
              >
                <option value="" disabled>Select category</option>
                <option>Grains</option>
                <option>Pulses</option>
                <option>Oils</option>
                <option>Spices</option>
                <option>Flour</option>
                <option>Sweeteners</option>
                <option>Dairy</option>
                <option>Beverages</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Measurement Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <Scale size={14} className="text-indigo-600" />
              Sold By
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['piece', 'kg', 'litre'] as MeasurementType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMeasurement(type)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    measurement === type
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {type === 'piece' ? 'Piece' : type === 'kg' ? 'Kilogram' : 'Litre'}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing — conditional on measurement */}
          {measurement && (
            <div className="flex flex-col gap-3 bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Coins size={14} className="text-indigo-600" />
                {measurement === 'piece' && 'Set the price per piece'}
                {measurement === 'kg' && 'Set price for each weight variant'}
                {measurement === 'litre' && 'Set price for each volume variant'}
              </p>

              {measurement === 'piece' && (
                <PriceField
                  label="1 Piece"
                  value={piecePrice}
                  onChange={setPiecePrice}
                  placeholder="Price per piece"
                />
              )}

              {measurement === 'kg' && (
                <div className="grid grid-cols-2 gap-3">
                  <PriceField label="100 gm" value={kgPrices.g100} onChange={v => setKgPrices(p => ({ ...p, g100: v }))} />
                  <PriceField label="250 gm" value={kgPrices.g250} onChange={v => setKgPrices(p => ({ ...p, g250: v }))} />
                  <PriceField label="500 gm" value={kgPrices.g500} onChange={v => setKgPrices(p => ({ ...p, g500: v }))} />
                  <PriceField label="1 kg" value={kgPrices.kg1} onChange={v => setKgPrices(p => ({ ...p, kg1: v }))} />
                </div>
              )}

              {measurement === 'litre' && (
                <div className="grid grid-cols-2 gap-3">
                  <PriceField label="100 ml" value={litrePrices.ml100} onChange={v => setLitrePrices(p => ({ ...p, ml100: v }))} />
                  <PriceField label="250 ml" value={litrePrices.ml250} onChange={v => setLitrePrices(p => ({ ...p, ml250: v }))} />
                  <PriceField label="500 ml" value={litrePrices.ml500} onChange={v => setLitrePrices(p => ({ ...p, ml500: v }))} />
                  <PriceField label="1 Litre" value={litrePrices.l1} onChange={v => setLitrePrices(p => ({ ...p, l1: v }))} />
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-600" />
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your product — quality, sourcing, storage details..."
              rows={4}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
            />
          </div>

          {/* Key Features */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <ListChecks size={14} className="text-indigo-600" />
              Key Features
            </label>
            <textarea
              value={keyFeatures}
              onChange={e => setKeyFeatures(e.target.value)}
              placeholder={'• No additives or preservatives\n• FSSAI certified\n• Bulk discount available\n• Direct farm sourcing'}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
            />
            <p className="text-xs text-gray-300">One feature per line</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!measurement || !isPricesFilled()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-sm"
          >
            <PackagePlus size={18} />
            {!measurement
              ? 'Select a measurement type first'
              : !isPricesFilled()
              ? 'Fill all prices to continue'
              : 'Add Product'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default VendorAddProduct
