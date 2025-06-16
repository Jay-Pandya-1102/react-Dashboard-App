import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Navbar from './pages/Navbar';

function App() {
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const showNavbar = location.pathname !== '/'

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add-product/:id/edit" element={<ProductForm />} />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </div>
    </>
  )
}

export default App
