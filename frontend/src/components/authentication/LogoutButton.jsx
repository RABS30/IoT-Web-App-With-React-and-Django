import { Navigate } from "react-router-dom"
import api from "../../api/AxiosConfig"
import { useUserAuthenticated } from "../../api/UserVerification";
import Logout from "../../api/Logout";

import { SignOut } from "@phosphor-icons/react";


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
        
        <button onClick={handleLogoutButton} className="w-full cursor-pointer flex items-center justify-center gap-2 text-red-600 dark:text-red-400 bg-transparent border-2 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl text-md px-5 py-3.5 transition-all transform active:scale-[0.98]">                            
            <SignOut size={20} weight="bold" /> Logout Account
        </button>
    )
}