import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    navigate('/')
  }

  return (
    <div className="bg-[#2c3e50] text-white px-6 py-4 flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">E-Commerce Dashboard</h1>

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className={`px-4 py-2 rounded hover:bg-white hover:text-black transition ${isActive('/dashboard') ? 'bg-blue-500' : ''
            }`}
        >
          Dashboard
        </Link>
        <Link
          to="/products"
          className={`px-4 py-2 rounded hover:bg-white hover:text-black transition ${isActive('/products') ? 'bg-blue-500' : ''
            }`}
        >
          Products
        </Link>
        <Link
          to="/add-product"
          className={`px-4 py-2 rounded hover:bg-white hover:text-black transition ${isActive('/add-product') ? 'bg-blue-500' : ''
            }`}
        >
          Add Product
        </Link>
      </div>

      <button
        onClick={logout}
        className="bg-[#e74c3c] hover:bg-red-500 px-4 py-2 rounded text-white font-medium"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
