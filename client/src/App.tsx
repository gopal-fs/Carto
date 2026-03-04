import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Auth from "./pages/Auth"


const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/login" element={<Auth />} />
    )
  )


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App