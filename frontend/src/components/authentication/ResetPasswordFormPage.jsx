import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/AxiosConfig";
import Toast from "../Toast";

export default function ResetPasswordFormPage(){
    const navigate = useNavigate()
    // data yang diperlukan untuk konfirmasi reset password ( UID, Token, Password1 dan Password2 )
    const { uid, token }            = useParams()
    const [password, setPassword]   = useState({
        new_password1 : '',
        new_password2 : '',
    })

    // Status Reset Password
    const [status, setStatus] = useState({
            loading : false,
            error   : '',
            success : false
    })
    
    // Reset Password
    const resetPasswordHandler = async (e) =>  {
        e.preventDefault()

        setStatus({ ...status, loading: true, error: '' });

        if (password.new_password1 !== password.new_password2) {
            setStatus({ loading: false, error: "Passwords do not match!", success: false });
            return;
        }

        try{
            // Reset Password
            const response = await api.post('authenticate/password/reset/confirm/', {
                uid: uid,
                token: token,
                new_password1: password.new_password1,
                new_password2: password.new_password2
            })
            // Ubah status
            setStatus({ loading: false, error: '', success: true });


            setTimeout(() => {
                navigate('/login');
            }, 3000);

        }catch(error){
            // Jika gagal reset password, ubah statue
            setStatus({
                loading : false,
                error   : error.response?.data ? Object.values(error.response.data) : "Something went wrong",
                success : false
            });
        console.log(error.response)
        }


    }

    // Change password for reset
    const changePasswordHandler = (e) => {
        const {name, value} = e.target

        setPassword((prev) => ({
            ...prev, 
            [name] : value
        }))
    }
    

    return (
        <>
            <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
                    {/* ===== Toast Component  ===== */}
                    {/* <Toast showToast={showToast.showToast} setShowToast={setShowToast} type={showToast.type} message={showToast.message} status={showToast.status}/> */}

                    {/* ===== background decorative blobs ===== */}
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
                    <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

                    <div className="z-10 w-full max-w-lg">
                                    <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                                        <div className="p-8 space-y-6">
                                            <div className="text-center">
                                                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                                    Set New Password
                                                </h1>
                                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                                    Please enter your new password below.
                                                </p>
                                            </div>

                                            {status.success ? (
                                                <div className="p-4 mb-4 text-sm text-green-800 rounded-xl bg-green-50 dark:bg-gray-700 dark:text-green-400 border border-green-200 dark:border-green-800 animate-pulse">
                                                    Password successfully reset! Redirecting to login...
                                                </div>
                                            ) : (
                                                <form className="space-y-4" onSubmit={resetPasswordHandler}>
                                                    {status.error && (
                                                        <div className="p-3 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-gray-700 dark:text-red-400 border border-red-200">
                                                            {status.error}
                                                        </div>
                                                    )}

                                                    {/* New Password */}
                                                    <div>
                                                        <label htmlFor="new_password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="new_password1"
                                                            id="new_password1"
                                                            value={password.new_password1}
                                                            onChange={changePasswordHandler}
                                                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Confirm New Password */}
                                                    <div>
                                                        <label htmlFor="new_password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="new_password2"
                                                            id="new_password2"
                                                            value={password.new_password2}
                                                            onChange={changePasswordHandler}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                                            required
                                                        />
                                                    </div>

                                                    <button 
                                                        type="submit" 
                                                        disabled={status.loading}
                                                        className={`w-full text-white font-bold rounded-xl text-md px-5 py-3 text-center transition-all transform 
                                                            ${status.loading 
                                                                ? "bg-gray-600 cursor-not-allowed opacity-70" 
                                                                : "bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:scale-[0.98]" 
                                                            }`}
                                                    >
                                                        {status.loading ? 'Updating Password...' : 'Reset Password'}
                                                    </button>
                                                </form>
                                            )}

                                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                                Remember your password?{' '}
                                                <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                                    Back to Login
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                    </div>
            </div>
        </>
    );








}