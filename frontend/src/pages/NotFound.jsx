import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* ===== Background Decorative Blobs (Konsisten dengan Dashboard) ===== */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

      {/* ===== Content ===== */}
      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest animate-pulse">
          404
        </h1>
        <div className="bg-indigo-600 px-2 text-sm rounded rotate-12 absolute top-10 left-1/2 -translate-x-1/2 shadow-lg">
          Halaman Tidak Ditemukan
        </div>
        
        <div className="mt-8">
          <p className="text-gray-400 text-lg mb-8">
            Waduh!!!, sepertinya kamu tersesat di jalan yang salah.
          </p>
          
          <Link
            to="/"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>

      {/* ===== Minimalist Device Decoration (Optional) ===== */}
      <div className="mt-12 opacity-20 border border-gray-800 rounded-xl p-6 bg-gray-900/50 backdrop-blur-sm">
        <p className="text-xs text-indigo-400 font-mono">System Status: 404_PATH_NOT_DEFINED</p>
      </div>
    </div>
  );
}