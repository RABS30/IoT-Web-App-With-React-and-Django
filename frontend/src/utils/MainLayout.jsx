import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-950 relative overflow-x-hidden">
      
      {/* 1. Background Decorative Blobs (Agar muncul di semua halaman) */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-20 blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-15 blur-[90px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-10 blur-[120px] pointer-events-none z-0"></div>

      {/* 2. Navbar tetap di atas */}
      <Navbar />

      {/* 3. Main Content Wrapper */}
      {/* py-6 atau mt-4 memastikan konten tidak menempel ke navbar */}
      <main className="relative z-10 w-full flex flex-col items-center gap-6 px-4 py-6 md:px-8">
        <Outlet />
      </main>

    </div>
  );
}