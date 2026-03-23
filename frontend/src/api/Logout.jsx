import api from "./AxiosConfig";

export default async function Logout(){
    try {
        await api.post('api/auth/logout')
    }catch(error){
        throw error
    }
}