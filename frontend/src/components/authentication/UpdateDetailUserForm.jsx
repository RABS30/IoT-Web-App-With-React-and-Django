import React, { useState, useEffect } from 'react';
import Toast from '../../utils/Toast';
import api from '../../api/AxiosConfig';
import { useUserAuthenticated } from '../../api/UserVerification';
import { useNavigate } from 'react-router-dom';

export default function UpdateDetailUserForm() {
    // Redirect ke halaman tertentu
    const navigate = useNavigate();
    // Mengambil data user detail sebagai data awal form
    const { user, setUser } = useUserAuthenticated();
    



    // Konfirmasi update data
    const [showConfirm, setShowConfirm] = useState(false);
    // Data image   
    const [previewImage, setPreviewImage] = useState(null);
    // Memunculkan konfirmasi update data
    const [clicked, setClicked] = useState(false);
    // Konfigurasi Toast
    const [showToast, setShowToast] = useState({
        showToast: false, type: '', message: '', status: ''
    });


    // mengambil data image untuk ditampilkan
    useEffect(() => {
        setPreviewImage(user?.profile?.avatar)
    }, [])

    // Handle perubahan data pada form
    const handleChangeDataForm = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };
    // Handle perubahan foto profile
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setUser(prev => ({
                ...prev,
                profile: { ...prev.profile, avatar: file }
            }));
            // Membuat URL baru untuk menampilkan foto sebagai preview foto profile
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    // Memunculkan konfirmasi update data
    const handleConfirmDataUpdate = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    // Update data
    const handleUpdateData = async () => {
        // Tutup halaman konfirmasi dan button save changes kembali seperti semula
        setShowConfirm(false);
        setClicked(true);
        
        // FormData digunakan untuk mengirim data selain tipe data primitive
        const formData = new FormData();
        // Masukkan data ke dalam form
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        // periksa apakah avatar berupa url string atau file 
        if (user.profile?.avatar instanceof File) {
            formData.append('profile.avatar', user.profile.avatar);
        }

        // Percobaan update data
        try {
            const response = await api.patch('/authenticate/user/', formData);
            setShowToast({
                showToast: true,
                type: 'success',
                message: 'Profile updated successfully!',
                status: 'Success'
            });
            setUser(response.data);
            
            // Beri jeda sedikit agar user bisa melihat Toast sukses sebelum pindah
            setTimeout(() => {
                navigate('/profile', { replace: true });
            }, 1500);
        // Gagal Update data
        } catch (error) {
            setShowToast({
                showToast: true,
                type: 'error',
                message: 'Failed to update profile.',
                status: 'Error'
            });
        } finally {
            setClicked(false);
        }
    };



    return (
        <div className="min-h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
            <Toast {...showToast} setShowToast={setShowToast} />

            {/* ===== Konfirmasi Update Modal ===== */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Konfirmasi Perubahan</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Apakah anda yakin ingin mengubah data profil anda?
                            </p>
                        </div>
                        <div className="mt-6 flex space-x-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Tidak
                            </button>
                            <button
                                onClick={handleUpdateData}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all"
                            >
                                Ya, Ubah
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Background Decorative Blobs ===== */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            {/* ===== Form Component ===== */}
            <div className="z-10 w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                Update Profile
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Personalize your account information</p>
                        </div>

                        {/* ===== Update Form ===== */}
                        <form className="space-y-5" onSubmit={handleConfirmDataUpdate}>
                            {/* ===== Profile Picture Input ===== */}
                            <div className="flex flex-col items-center space-y-4 mb-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full border-4 border-blue-600/30 overflow-hidden bg-gray-700">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>

                            {/* ===== User Input ===== */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* ===== Username ===== */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-400">Username (Fixed)</label>
                                    <input
                                        type="text"
                                        value={user.username}
                                        className="bg-gray-100 border border-gray-300 text-gray-500 rounded-xl block w-full p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-500 cursor-not-allowed"
                                        disabled
                                    />
                                </div>

                                {/* ===== Email ===== */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-400">Email Address (Fixed)</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        className="bg-gray-100 border border-gray-300 text-gray-500 rounded-xl block w-full p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-500 cursor-not-allowed"
                                        disabled
                                    />
                                </div>

                                {/* ===== First Name ===== */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input type="text" name="first_name" value={user.first_name} onChange={handleChangeDataForm} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all" placeholder="Enter first name"/>
                                </div>

                                {/* ===== Last Name ===== */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" name="last_name" value={user.last_name} onChange={handleChangeDataForm} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all" placeholder="Enter last name"/>
                                </div>
                            </div>
                            {/* ===== Button ===== */}
                            <button type="submit" disabled={clicked} className={`w-full mt-4 text-white font-bold rounded-xl text-md px-5 py-3 text-center transition-all transform  ${clicked ? "bg-gray-600 cursor-not-allowed opacity-70" : "bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 active:scale-[0.98] shadow-lg shadow-blue-600/20"}`}>
                                {clicked ? 'Memproses...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
