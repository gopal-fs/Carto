import React from 'react'
import Products from '../../components/Products'

const ShopProducts = () => {
  return (
    <div className='flex flex-wrap justify-center items-center sm:justify-start sm:items-start gap-3'>
      <Products />
      <Products />
      <Products />
      <Products />
    </div>
  )
}

export default ShopProducts