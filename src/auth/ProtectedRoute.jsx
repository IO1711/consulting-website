import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import Loader from "../utility/Loader";

const ProtectedRoute = () => {
    const token = useAuthStore((s) => s.token);
    const hasHydrated = useAuthStore((s) => s.hasHydrated);
    const location = useLocation();

    if (!hasHydrated) {
        return <Loader/>;
    }

    if (token === "") {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;
