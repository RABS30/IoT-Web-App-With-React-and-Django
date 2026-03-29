import api from "./AxiosConfig";

export default async function Logout(){
    try {
        const response = await api.post('authenticate/logout/')

        return response
    }catch(error){
        throw error
    }
}