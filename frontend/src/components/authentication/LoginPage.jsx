// LoginPage.jsx
import React, { useContext, useState } from 'react';
import LoginWithGoogle from './LoginWithGoogle';
import axios from 'axios';
import api from '../../api/AxiosConfig';
import Login from '../../api/Login';

export default function LoginPage() {

    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailLogin = async (e) => { // 1. Tambahkan async
    e.preventDefault();
    
    // 2. Ambil nilai langsung dari state email dan password
    // Atau jika Anda tidak mengikat input ke state, gunakan e.target
    // const emailValue = e.target.email.value;
    // const passwordValue = e.target.password.value;
    const emailValue = 'admin@gmail.com'
    const passwordValue  = 'admin123'

    try {
        console.log("Mencoba login dengan:", emailValue, 'dan password : ', passwordValue);
        
        // 3. Tambahkan await
        const data = await Login(emailValue, passwordValue); 
        
        console.log("Login Berhasil!", data);
        
        // 4. Redirect ke dashboard setelah sukses
        window.location.href = '/'; 
        
    } catch (err) {
        // 5. Tangkap detail error dari Django
        console.error("Login Gagal. Detail dari server:", err.response?.data);
        alert("Login Gagal: Periksa kembali email dan password Anda.");
    }
}




    return (
    <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">

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

            <form className="space-y-5" onSubmit={handleEmailLogin}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
                </label>
                <input
                type="email"
                name="email"
                id="email"
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
                placeholder="Password"
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
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                    </label>
                </div>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Forgot password?
                </a>
            </div>

            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all transform active:scale-[0.98]"
            >
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
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
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