import { useState } from "react"
import api from "./AxiosConfig"

export default async function UserDetail(){

    const [user, setUser] = useState(null)

    try {
        const data_user = await api.get('authenticate/user/')
        setUser(data_user)   
        return user 
    }
    
    catch(error){
        throw error
    }

}