// GoogleLoginButton.jsx
import React from 'react';

// Ganti dengan Client ID Anda yang sebenarnya dari Google Cloud Console
const GOOGLE_CLIENT_ID = '26929392258-fsdqf6rg58pgv2to6ddsbah3ertcu7rc.apps.googleusercontent.com';

// URL Callback di React Anda (pastikan ini didaftarkan di Google Console)
const REDIRECT_URI = 'http://localhost:5173/auth/google/callback'; 

export default function LoginWithGoogle() {
  const handleGoogleLogin = () => {
    // 1. Buat URL autentikasi Google
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    
    // 2. Tambahkan parameter yang diperlukan
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('response_type', 'code'); // Meminta 'code', bukan token langsung
    authUrl.searchParams.set('scope', 'openid email profile'); // Data yang diminta
    authUrl.searchParams.set('access_type', 'offline'); // Opsional: untuk refresh token
    authUrl.searchParams.set('prompt', 'consent'); // Memaksa layar persetujuan muncul

    // 3. Arahkan pengguna ke halaman login Google
    window.location.href = authUrl.toString();
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
    >
      {/* Logo Google (SVG) */}
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <defs>
          <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible"/>
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
        <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
        <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
      </svg>
      <span>Masuk dengan Google</span>
    </button>
  );
}