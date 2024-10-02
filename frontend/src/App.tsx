import { RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import router from './router.tsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
