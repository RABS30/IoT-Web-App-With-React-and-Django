import { Navigate } from "react-router-dom"
import api from "../../api/AxiosConfig"
import { useUserAuthenticated } from "../../api/UserVerification";


export default function LogoutButton(){
    const { setUser } = useUserAuthenticated();

    const  handleLogoutButton = async () => {
        try{
            await api.post('http://localhost:8000/api/auth/logout/')

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