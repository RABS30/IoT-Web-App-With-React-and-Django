import { Navigate, Outlet } from "react-router-dom";
import { useUserAuthenticated } from "../../api/UserVerification";

export default function GuestPage(){
    const {user, loading} = useUserAuthenticated()

    if(user){
        return <Navigate to={'/'} replace /> 
    }

    return <Outlet />
}