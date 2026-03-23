import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserAuthenticated } from "../../api/UserVerification";


export default function ProtectedPage() { 
    const { user, loading } = useUserAuthenticated();

    if (loading) {
        return (
            <div className="h-screen w-full bg-gray-950 flex items-center justify-center">
                <div className="text-blue-500 animate-pulse font-bold">Verifying Session...</div>
            </div>
        );
    }

    // Jika loading sudah FALSE dan user masih NULL, barulah pindah ke login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}