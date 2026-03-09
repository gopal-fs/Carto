
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root')!).render(
 <>

 <App />

  
    <Toaster position="top-center" reverseOrder={false} />
 
 </>
   
)
