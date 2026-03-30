import { useState } from "react";
import api from "../../api/AxiosConfig";
import Toast from "../Toast";
import LoginWithGoogle from "./LoginWithGoogle";
export default function RegisterUserPage(){
    // Data pengguna untuk registrasi
    const [userData, setUserData]   = useState({
        username : '',
        email    : '',
        password1: '',
        password2: '',
    })
    
    // Konfiugurasi Toast
    const [showToast, setShowToast] = useState({
        showToast   : false,
        type        : 'success',
        status      : 'Success',
        message     : 'Berhasil'
    })

    // Berhasil Registrasi atau belum
    const [successRegister, setSuccessRegister] = useState(false)
    
    // saat button registrasi pengguna ditekan
    const [clicked, setClicked] = useState(false)

    // Registrasi data user
    const handleRegister = async (e) => {
        e.preventDefault()
        setClicked(true)

        try {
            const response = await api.post('authenticate/register/', userData)
            setSuccessRegister(true)
        }catch(error){
            setClicked(false)
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : `${error.response.status} ${error.response.statusText}`,
                message     : Object.values(error.response?.data).flat()
            }))
        }
    }

    // Ubah data user saat user mengisi form
    const handleChangeDataUser = (e) =>  {
        const {name, value} =  e.target

        setUserData(prev => ({
            ...prev, [name]: value
        }))
    }

    return (
        <>
            <Toast showToast={showToast['showToast']} setShowToast={setShowToast} type={showToast['type']} message={showToast['message']} status={showToast['status']}/>
        
            <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
                {/* ===== Toast Component (Asumsi Anda sudah punya komponen ini) ===== */}
                {/* <Toast showToast={showToast.showToast} setShowToast={setShowToast} type={showToast.type} message={showToast.message} status={showToast.status}/> */}

                {/* ===== background decorative blobs ===== */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

                {!successRegister ? 
                <>
                    {/* ===== Register Card Container ===== */}
                    <div className="z-10 w-full max-w-lg">
                        <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                            <div className="p-8 space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                        Create an account
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Join us today! Please fill in your details.</p>
                                </div>

                                <form className="space-y-4" method="POST" onSubmit={handleRegister}>
                                    {/* Username */}
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={userData.username}
                                            onChange={handleChangeDataUser}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                            placeholder="johndoe"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={userData.email}
                                            onChange={handleChangeDataUser}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>

                                    {/* Password 1 */}
                                    <div>
                                        <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password1"
                                            id="password1"
                                            value={userData.password1}
                                            onChange={handleChangeDataUser}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Password 2 */}
                                    <div>
                                        <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password2"
                                            id="password2"
                                            value={userData.password2}
                                            onChange={handleChangeDataUser}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    {/* <button type="submit" className={`${clicked ? '' : "w-full  cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all transform active:scale-[0.98]"}`}> */}
                                    <button 
                                    type="submit" 
                                    disabled={clicked} // Akan true jika sedang loading
                                    className={`w-full text-white font-bold rounded-xl text-md px-5 py-3 text-center transition-all transform 
                                        ${clicked ? "bg-gray-600 cursor-not-allowed opacity-70" : "bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:scale-[0.98]" }`}>
                                            {clicked ? 'Loading...' : 'Create Account'}
                                        
                                    </button>

                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or register with</span>
                                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                                    </div>

                                    {/* Komponen Google Login Anda */}
                                    <LoginWithGoogle />


                                    <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            Login here
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    {/* ===== Success Registration Account ===== */}
                    <div className="z-10 w-full max-w-lg">
                        <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                            <div className="p-10 text-center space-y-6">
                                {/* Icon Success Beranimasi */}
                                <div className="flex justify-center">
                                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Registration Successful!</h1>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Your account has been created. Please check your email to verify your account before logging in.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <a 
                                        href="/login" 
                                        className="inline-block w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/30"
                                    >
                                        Go to Login Page
                                    </a>
                                </div>

                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    Didn't receive an email? <button className="text-blue-500 hover:underline">Resend email</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </> 
                }
            </div>
        </>
    );
}