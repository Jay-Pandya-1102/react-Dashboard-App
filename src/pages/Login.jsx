import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Login</h2>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input type="email" required className="w-full border border-gray-300 px-4 py-2 rounded" placeholder="admin@example.com" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input type="password" required className="w-full border border-gray-300 px-4 py-2 rounded" placeholder="Enter your password" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
