import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
// import ProtectedRoute from './pages/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add-product/:id/edit" element={<ProductForm />} />
          <Route path="/add-product" element={<ProductForm />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
