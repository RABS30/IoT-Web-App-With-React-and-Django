import { createContext, useContext, useEffect, useState } from "react"
import api from "./AxiosConfig"

// buat context
const UserAuthenticated = createContext()


export default function UserVerification({children}){
    
    const [user, setUser]       = useState(null)
    const [loading, setLoading] = useState(true)

    // Function untuk mengambil data detail pengguna
    const authUser = async () => {
        // mencoba mengambil data pengguna
        try {
            const response = await api.get('api/auth/user/')
            setUser(response.data)
        // Jika gagal mengambil data pengguna, ubah user ke null dan return error
        }catch(error){
            setUser(null)
        // ubah loading menjadi false karena data sudah berhasil diambil 
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        authUser()
    }, [])

    return (
        <UserAuthenticated.Provider value={{user, setUser, loading}}>
            {children}
        </UserAuthenticated.Provider>
    )
}


export const useUserAuthenticated = () =>  {
    const context = useContext(UserAuthenticated)

    return context
}   