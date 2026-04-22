import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"

import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"

import DeliveryLayout from "./layouts/DeliveryLayout"
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard"
import DeliveryOrders from "./pages/delivery/DeliveryOrders"
import DeliveryProfile from "./pages/delivery/DeliveryProfile"

import VendorLayout from "./layouts/VendorLayout"
import VendorDashboard from "./pages/vendor/VendorDashboard"
import VendorProducts from "./pages/vendor/VendorProducts"
import VendorAddProduct from "./pages/vendor/VendorAddProduct"
import VendorSellSample from "./pages/vendor/VendorSellSample"
import VendorOrders from "./pages/vendor/VendorOrders"

import Dashboard from "./pages/user/Dashboard"
import Shops from "./pages/user/Shops"
import Cart from "./pages/user/Cart"
import Orders from "./pages/user/Orders"
import Reviews from "./pages/user/Reviews"
import Wallet from "./pages/user/Wallet"
import Profile from "./pages/user/Profile"
import Settings from "./pages/user/Settings"
import ShopPage from "./pages/user/ShopPage"
import SavedShops from "./pages/user/SavedShops"
import Notifications from "./pages/user/Notification"
import ProductDetailPage from "./pages/user/ProductDetailPage"
import Auth from "./pages/user/Auth"
import NotFound from "./pages/NotFound"
import UserLayout from "./layouts/UserLayout"
import ShopLayout from "./layouts/ShopLayout"
import ShopDashboard from "./pages/shop/ShopDashboard"
import RegisterShop from "./pages/shop/RegisterShop"
import ShopProducts from "./pages/shop/ShopProducts"
import ShopInfo from "./pages/shop/ShopPage"
import Coupon from "./pages/shop/Coupon"
import AddProduct from "./pages/shop/AddProduct"
import Sale from "./pages/shop/Sale"
import ShopVendor from "./pages/shop/ShopVendor"
import Protected from "./pages/Protected"




const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      

        <Route element={<Protected />}>
        <Route path="/" element={<Navigate to='/user/dashboard' />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="shops" element={<Shops />} />
          <Route path="shops/:id" element={<ShopPage />} />
          <Route path="shops/:id/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          
            

         
          <Route path="reviews" element={<Reviews />} />
          <Route path="saved-shops" element={<SavedShops />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

        </Route>
        </Route>
        {/* <Route path="/shop" element={<Navigate to="register" />} /> */}
        <Route path="/shop/register" element={<RegisterShop />} />
        <Route path="/shop/:id" element={<ShopLayout />}>
          <Route index  element={<ShopDashboard />} />
          <Route  path="products" element={<ShopProducts />} />
          <Route  path="shop-page" element={<ShopInfo />} />
          <Route  path="coupons" element={<Coupon />} />
          <Route  path="sale" element={<Sale />} />
          <Route  path="add-products" element={<AddProduct />} />
          <Route  path="vendor" element={<ShopVendor />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="add-product" element={<VendorAddProduct />} />
          <Route path="sell-sample" element={<VendorSellSample />} />
          <Route path="orders" element={<VendorOrders />} />
        </Route>
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="orders" element={<DeliveryOrders />} />
          <Route path="profile" element={<DeliveryProfile />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
        <Route path="/login" element={<Auth />} />
      </>
      
    )
  )


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App