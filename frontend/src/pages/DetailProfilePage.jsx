import React, { useEffect, useState } from 'react';
// Cek kembali penamaan ini, biasanya UserEdit ditulis sebagai UserCircleGear atau PencilSimple
import { Key, PencilSimple, CheckCircle, WarningCircle, SignOut } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/authentication/LogoutButton';
import api from '../api/AxiosConfig';

export default function DetailProfilePage () {
    // Data user
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        is_verified: true,
        profile_picture: null 
    })

    // Untuk redirect ke halaman tertentu
    const navigate = useNavigate()

    // Redirect ke halaman edit profile
    const onEditClick = () => {
        navigate('/edit-profile')
    }

    // Redirect ke halaman ganti password
    const onChangePasswordClick = () => {
        navigate('/change-password')
    }

    // Mengambil data 
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                // Ambil detail data pengguna
                const response = await api.get('authenticate/user/')
                const profile = response.data
                    setProfileData((prev) => ({
                        ...prev, 
                        username    : profile.username,
                        email       : profile.email,
                        first_name  : profile.first_name,
                        last_name   : profile.last_name,
                    })
                 )
            }catch(error){
                console.log(error)
            }
        }
        getUserProfile()
    }, [])




    
    return (
        <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
            {/* ===== Background Decorative Blobs ===== */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            {/* ===== Profile Card Container ===== */}
            <div className="z-10 w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        {/* Header & Avatar */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 shadow-xl shadow-blue-600/20">
                                    {profileData.profile_picture ? (
                                        <img src={profileData.profile_picture} alt="Profile" className="w-full h-full rounded-full object-cover"/>
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {/* Verification Badge */}
                                <div className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1">
                                    {profileData.is_verified ? (
                                        <CheckCircle size={28} weight="fill" className="text-green-500" />
                                    ) : (
                                        <WarningCircle size={28} weight="fill" className="text-yellow-500" />
                                    )}
                                </div>
                            </div>

                            {/* Footer Status */}
                            <div className="text-center">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${profileData.is_verified ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {profileData.is_verified ? 'VERIFIED ACCOUNT' : 'PENDING VERIFICATION'}
                                </span>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {profileData.first_name} {profileData.last_name}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">@{profileData.username}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-4 py-2">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 transition-all">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</p>
                                <p className="text-gray-900 dark:text-white font-medium">{profileData.email}</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">First Name</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{profileData.first_name}</p>
                                </div>
                                <div className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Last Name</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{profileData.last_name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <button 
                                onClick={onEditClick}
                                className="w-full cursor-pointer flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-md px-5 py-3.5 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/25"
                            >
                                <PencilSimple size={20} weight="bold" />
                                Edit Profile
                            </button>
                            
                            <button 
                                onClick={onChangePasswordClick}
                                className="w-full cursor-pointer flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold rounded-xl text-md px-5 py-3.5 transition-all transform active:scale-[0.98]"
                            >
                                <Key size={20} weight="bold" />
                                Change Password
                            </button>
                        </div>

                                    
                        <LogoutButton />



                    </div>
                </div>
            </div>
        </div>
    );
};