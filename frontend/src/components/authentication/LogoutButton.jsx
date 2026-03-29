import { Navigate } from "react-router-dom"
import api from "../../api/AxiosConfig"
import { useUserAuthenticated } from "../../api/UserVerification";
import Logout from "../../api/Logout";

export default function LogoutButton(){
    const { setUser } = useUserAuthenticated();

    const  handleLogoutButton = async () => {
        try{
            const response = await Logout()

            setUser(null)

            window.location.href = "/login"
        }catch(error){
            console.log(error)
        }
    }

    return (
        
        <button onClick={handleLogoutButton} className="px-3 py-2 rounded-md transition duration-200 hover:bg-slate-700 hover:text-sky-400 cursor-pointer text-white">Logout</button>
    )
}