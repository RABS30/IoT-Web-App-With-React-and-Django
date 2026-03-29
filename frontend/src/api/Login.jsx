import api from "./AxiosConfig";

export default async function Login(email, password){
    // Login
    try {
        // Mencoba login
        const response = await api.post('authenticate/login/', {
            email       : email, 
            password    : password
        })
        
        // Return data detail pengguna jika berhasil login
        return response.data
    }catch(error){
        // Return error jika gagal login
        throw error
    }
}