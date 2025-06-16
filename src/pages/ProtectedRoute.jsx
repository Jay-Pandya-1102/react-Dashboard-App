
import { Outlet, Navigate } from "react-router-dom"
import useAuthStore from "../auth//useAuthStore";


function ProtectedRoute() {
    const user = useAuthStore(state => state.user);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute