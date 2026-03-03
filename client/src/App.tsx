import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"


const App = () => {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/login" element={<Login />} />
    )
  )


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App