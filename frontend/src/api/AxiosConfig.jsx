import axios from "axios";

const baseURL       = 'http://localhost:8000/'

const api = axios.create({
    baseURL         : baseURL,
    withCredentials : true,
})


// Handle Refresh Token 
api.interceptors.response.use(
    // Argumen 1: Fungsi saat request BERHASIL
    (response) => response, 

    // Argumen 2: Fungsi saat request ERROR (ada koma di atas)
    async (error) => {
        const user_request = error.config;

        // Jika error 401 dan belum pernah dicoba refresh
        if (error.response?.status === 401 && !user_request._retry) {
            user_request._retry = true;

            try {
                // Gunakan axios (bukan api) agar tidak kena interceptor ini lagi
                await axios.post(baseURL + 'api/auth/token/refresh/', {}, { withCredentials: true });

                // Jalankan ulang request yang tadi gagal
                return api(user_request);
            } catch (refreshError) {
                // Jika refresh token juga expired (gagal total)
                console.error("Session expired:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        // Jika error bukan 401, lempar error ke komponen
        return Promise.reject(error);
    }
);


export default api
export {baseURL}
