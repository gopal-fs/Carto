import ShopPro from '../../components/ShopPro'

const ShopProducts = () => {
  return (
    <div className='w-full min-h-screen bg-gray-50 p-4 sm:p-6'>
      <div className='mb-5'>
        <h1 className='text-xl font-semibold text-gray-800'>My Products</h1>
        <p className='text-sm text-gray-400 mt-0.5'>Manage your listed products</p>
      </div>
      <ShopPro />
    </div>
  )
}

export default ShopProducts
