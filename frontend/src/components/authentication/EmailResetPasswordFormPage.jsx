import React, { useState } from 'react';
import api from '../../api/AxiosConfig';
import Toast from '../../utils/Toast';



export default function EmailResetPasswordFormPage() {
    // Email yang akan reset password
    const [email, setEmail] = useState('');
    // Status saat ini
    const [status, setStatus] = useState({
        success : false,
        loading : false
    });
    // Konfiugurasi Toast
    const [showToast, setShowToast] = useState({
        showToast   : false,
        type        : 'success',
        status      : 'Success',
        message     : 'Berhasil'
    })



    // Konfirmasi email untuk reset password
    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        // Ubah status ke loading
        setStatus({ ...status, loading: true, error: null });
        
        try {
            const response = await api.post('authenticate/password/reset/', {
                email: email
            })
            setStatus({ success: true, loading: false, error: null });

        } catch (error) {
            setShowToast({
                showToast   : true,
                type        : 'error',
                status      : error.response?.status,
                message     : error.response?.data
            })
        }
    };







    return (
        <>
            <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden font-sans">
                {/* ===== Toast ===== */}
                <Toast showToast={showToast['showToast']} setShowToast={setShowToast} type={showToast['type']} message={showToast['message']} status={showToast['status']}/>

                {/* ===== Template Background Decorative Blobs ===== */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

                <div className="z-10 w-full max-w-lg">
                    <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <div className="p-8 space-y-6">
                            
                            {/* Header */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    No worries! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

                            {/* Jika status berhasil maka ubah form menjadi informasi */}
                            {status.success ? (
                                <div className="space-y-4">
                                    <div className="p-4 text-sm text-green-800 rounded-xl bg-green-50 dark:bg-gray-700/50 dark:text-green-400 border border-green-200 dark:border-green-800">
                                        <p className="font-semibold mb-1">Email Sent!</p>
                                        Please check your inbox at <strong>{email}</strong> for reset your password.
                                    </div>
                                    <a href="/login" className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-xl px-5 py-3 transition-all">
                                        Return to Login
                                    </a>
                                </div>
                            
                            ) : (
                            // Jika status masih false, maka component akan menampilkan form untuk mengisi email mana yang ingin direset passwordnya
                            <form className="space-y-4" method='POST' onSubmit={resetPasswordHandler}>
                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your Email Address
                                        </label>
                                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all outline-none" required/>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" disabled={status.loading} className={`w-full text-white font-bold rounded-xl text-md px-5 py-3 text-center transition-all transform ${status.loading ? "bg-gray-600 cursor-not-allowed opacity-70" : "bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 active:scale-[0.98]" }`}>
                                        {status.loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Loading...
                                            </span>
                                        ) : 
                                        'Reset Password'}
                                    </button>
                            </form>
                            )}

                            {/* Footer Link */}
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
};
