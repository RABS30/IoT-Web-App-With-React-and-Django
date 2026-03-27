import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/AxiosConfig";
import { useUserAuthenticated } from "../../api/UserVerification";


export default function RedirectAuthGoogle() {
  const navigate = useNavigate();
  const { setUser } = useUserAuthenticated();

  useEffect(() => {
    const sendCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        try {
          // 1. Kirim code ke Django
          const response = await api.post('/api/auth/google/', { code });
          
          // 2. Ambil data user dari response login dan simpan ke Context
          // Pastikan Django Anda mengirimkan data user dalam object response
          if (response.data && response.data.user) {
            setUser(response.data.user);
          }

          // 3. Pindah ke dashboard (Gunakan window.location jika masih error 401)
          // window.location.href = "/"; // Opsi paling aman jika navigate masih 401
          navigate("/", { replace: true });
          
        } catch (error) {
          console.error("Gagal menukar code:", error.response?.data || error.message);
          navigate("/login", { replace: true });
        }
      }
    };

    sendCode();
  }, [navigate, setUser]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white font-mono">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-blue-500 animate-pulse">Menghubungkan dengan Server...</p>
    </div>
  );
}