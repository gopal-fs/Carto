import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"


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


const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
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
        <Route path="/shop" element={<Navigate to="register" />} />
        <Route path="/shop/register" element={<RegisterShop />} />
        <Route path="/shop" element={<ShopLayout />}>
          <Route index path="dashboard" element={<ShopDashboard />} />
          <Route index path="products" element={<ShopProducts />} />
          <Route index path="shop-page" element={<ShopInfo />} />
          
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