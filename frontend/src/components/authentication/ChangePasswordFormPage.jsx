import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/AxiosConfig";

export default function ChangePasswordFormPage(){

    const navigate = useNavigate();

    // Data yang diperlukan: Password lama, Password baru 1 dan 2
    const [password, setPassword] = useState({
        old_password: '',
        new_password1: '',
        new_password2: '',
    });

    // Status Change Password
    const [status, setStatus] = useState({
        loading: false,
        error: '',
        success: false
    });

    // Change Password Handler (Submit ke API)
    const changePasswordSubmitHandler = async (e) => {
        e.preventDefault();

        setStatus({ ...status, loading: true, error: '' });

        // Validasi client-side: Match password
        if (password.new_password1 !== password.new_password2) {
            setStatus({ loading: false, error: "New passwords do not match!", success: false });
            return;
        }

        try {
            // Endpoint standar dj-rest-auth untuk ganti password (saat user sudah login)
            const response = await api.post('authenticate/password/change/', {
                old_password: password.old_password,
                new_password1: password.new_password1,
                new_password2: password.new_password2
            });

            setStatus({ loading: false, error: '', success: true });

            // Redirect setelah sukses
            setTimeout(() => {
                navigate('/'); // Atau ke halaman manapun setelah ganti password
            }, 3000);

        } catch (error) {
            // Handle error dari backend
            setStatus({
                loading: false,
                error: error.response?.data ? Object.values(error.response.data).flat().join(", ") : "Something went wrong",
                success: false
            });
            console.log(error.response);
        }
    };

    // Handler input change
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="h-screen w-full bg-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
            {/* ===== background decorative blobs (Sama dengan Reset Password) ===== */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                                Change Password
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Please enter your current and new password.
                            </p>
                        </div>

                        {status.success ? (
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-xl bg-green-50 dark:bg-gray-700 dark:text-green-400 border border-green-200 dark:border-green-800 animate-pulse">
                                Password successfully changed! Redirecting...
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={changePasswordSubmitHandler}>
                                {status.error && (
                                    <div className="p-3 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-gray-700 dark:text-red-400 border border-red-200">
                                        {status.error}
                                    </div>
                                )}

                                {/* Old Password */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="old_password"
                                        value={password.old_password}
                                        onChange={inputHandler}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                <hr className="border-gray-200 dark:border-gray-700 my-2" />

                                {/* New Password 1 */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password1"
                                        value={password.new_password1}
                                        onChange={inputHandler}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                {/* New Password 2 */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password2"
                                        value={password.new_password2}
                                        onChange={inputHandler}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status.loading}
                                    className={`w-full text-white font-bold rounded-xl text-md px-5 py-3 text-center transition-all transform 
                                        ${status.loading
                                            ? "bg-gray-600 cursor-not-allowed opacity-70"
                                            : "bg-blue-600 cursor-pointer hover:bg-blue-700 active:scale-[0.98]"
                                        }`}
                                >
                                    {status.loading ? 'Updating...' : 'Change Password'}
                                </button>
                            </form>
                        )}

                        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Changed your mind?{' '}
                            <button onClick={() => navigate(-1)} className="font-medium text-blue-600 hover:underline dark:text-blue-500 bg-transparent border-none cursor-pointer">
                                Go Back
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}