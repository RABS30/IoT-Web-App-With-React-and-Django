import axios from "axios";
import Cookies from "js-cookie";

const baseURL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,

    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
});

/**
 * REQUEST INTERCEPTOR
 * Mengambil token terbaru setiap kali request akan dikirim.
 */
api.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('csrftoken');
        
        // Gunakan toLowerCase() agar pengecekan method lebih aman
        const method = config.method?.toLowerCase();
        
        if (csrfToken && method !== 'get' && method !== 'head' && method !== 'options') {
            // Gunakan set agar header terpasang dengan pasti
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const user_request = error.config;

        if (error.response?.status === 401 && !user_request._retry) {
            user_request._retry = true;

            try {
                // Gunakan axios dasar (bukan instance 'api') untuk refresh
                await axios.post(baseURL + 'authenticate/token/refresh/', {}, { withCredentials: true });

                /**
                 * KRUSIAL: Saat retry, kita harus mengambil CSRF token terbaru lagi 
                 * karena token bisa berubah setelah refresh session/token.
                 */
                const newToken = Cookies.get('csrftoken');
                if (newToken) {
                    user_request.headers['X-CSRFToken'] = newToken;
                }

                return api(user_request);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { baseURL };