// LoginPage.jsx
import React, { useContext, useState }  from 'react';
import LoginWithGoogle                  from './LoginWithGoogle';
import axios                            from 'axios';
import api                              from '../../api/AxiosConfig';
import Login                            from '../../api/Login';
import Toast from '../Toast';



export default function LoginPage() {
    const [credentials, setCredentials]     = useState({
                                                email       : "",
                                                password    : ""
                                            })
    const [showPassword, setShowPassword]   = useState(false);
    const [showToast, setShowToast]         = useState({
                                                showToast   : false,
                                                type        : 'success',
                                                status      : 'Success',
                                                message     : 'Berhasil'
                                            })


    // Handle Credentials change
    const handleLoginCredentials = (e) => {
        const {name, value} = e.target

        setCredentials(prev => ({
            ...prev, 
            [name] : value
        }))
    }

    // User login
    const UserLogin = async (e) => { 
        e.preventDefault();

        try {
            // Login
            const data = await Login(credentials.email, credentials.password); 
            // Redirect ke dashboard setelah sukses
            window.location.href = '/'; 
            
        } catch (error) {
            // Jika gagal, hapus semua credentials di form
            setCredentials({
                            email       : "",
                            password    : ""
                        })
                        
            // Tampilkan notification Toast
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : `${error.status} ${error.response?.statusText}`,
                message     : error.response?.data.non_field_errors

            }))

            
        }
    }




    return (
        <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
        {/* ===== Toast =====  */}
        <Toast showToast={showToast['showToast']} setShowToast={setShowToast} type={showToast['type']} message={showToast['message']} status={showToast['status']}/>

        {/* ===== background decorative blobs ===== */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

        {/* ===== Login Card Container ===== */}
        {/* Menggunakan z-10 agar berada di atas blob background */}
        <div className="z-10 w-full max-w-lg"> 
            <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <div className="p-8 space-y-6">
                <div className="text-center">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    Sign in to your account
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Please enter your details.</p>
                </div>

                <form className="space-y-5" onSubmit={UserLogin}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                    </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleLoginCredentials}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                    placeholder="Email"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleLoginCredentials}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                    required
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                        id="remember"
                        type="checkbox"
                        className="w-4 cursor-pointer h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                    </div>
                    <div className="ml-3 text-sm ">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                        </label>
                    </div>
                    </div>
                    <a href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Forgot password?
                    </a>
                </div>

                <button type="submit" className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all transform active:scale-[0.98]">
                    Sign in
                </button>
                
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                <LoginWithGoogle />

                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Sign up
                    </a>
                </p>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}