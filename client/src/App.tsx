import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Auth from "./pages/Auth"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Shops from "./pages/Shops"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Reviews from "./pages/Reviews"
import Whistlist from "./pages/Whistlist"
import Wallet from "./pages/Wallet"
import Notification from "./pages/Notification"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"


const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shops" element={<Shops />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="whistlist" element={<Whistlist />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

        </Route>
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