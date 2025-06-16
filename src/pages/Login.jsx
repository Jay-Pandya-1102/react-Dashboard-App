import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAuthStore from "../auth/useAuthStore";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const login = useAuthStore(state => state.logn);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/dashboard')
    }

    return (
        <>
            <div className="p-4 max-w-md mx-auto mt-20">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-x1 fornt-bold">Login</h1>
                    <input placeholder="Enter Email" className="border p-2 w-full" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Password" className="border p-2 w-full" type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
