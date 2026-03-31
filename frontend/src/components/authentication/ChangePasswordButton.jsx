import { useNavigate } from "react-router-dom"

export default function ChangePasswordButton(){
    const navigate = useNavigate()

    const redirectPageHandler = () => {
        return navigate('/change-password')
    }


    return (
        <button type="submit" onClick={redirectPageHandler} className="px-3 py-2 rounded-md transition duration-200 hover:bg-slate-700 hover:text-sky-400 cursor-pointer text-white">
            Change Password
        </button>
    )
}