import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/AxiosConfig";
import { useEffect, useState } from "react";

export default function VerificationEmail(){
    const { key }               = useParams()
    const navigate              = useNavigate()
    const [status, setStatus]   = useState('verifying') 

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await api.post(`authenticate/register/verify-email/`, {
                    key: key
                })
                setStatus('success')

                setTimeout(() => navigate('/login'), 3000)

            }catch(error){
                setStatus('error')

            }
        }

        if(key){
            verifyEmail()
        }

    }, [])


    return (
        <div className="flex justify-center items-center h-screen text-white">
            {status === "verifying" && <p>Sedang memverifikasi email Anda...</p>}
            {status === "success" && <p className="text-green-500">Verifikasi Berhasil! Mengalihkan ke halaman login...</p>}
            {status === "error" && <p className="text-red-500">Verifikasi Gagal. Token mungkin kadaluwarsa.</p>}
        </div>
    );
}