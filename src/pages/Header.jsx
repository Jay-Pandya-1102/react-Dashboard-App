
import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate()

    const logout = () => {
        navigate("/login")
    }

    return (
        <header className="bg-green-500 text-white p-4 flex justify-between">
            <div className="space-x-4">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/add-product">Add Product</Link>
            </div>
            <button onClick={logout} className="text-black">Logout</button>
        </header>
    )
}

export default Header
