import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

const ProtectedRoute = () => {
    const token = useAuthStore((s) => s.token);
    const location = useLocation();
    

    if(token === ""){
        return <Navigate to="/login" state={{from: location}}/>
    }

    return <Outlet/>
}

export default ProtectedRoute;