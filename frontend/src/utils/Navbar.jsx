import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserAuthenticated } from "../api/UserVerification";
import LogoutButton from "../components/authentication/LogoutButton";
import ChangePasswordButton from "../components/authentication/ChangePasswordButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserAuthenticated();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Device", path: "/device" },
    { name: "My Account", path: "/profile" },
  ];

  // Base Style - Font dibuat sedikit lebih tegas agar terbaca di layar lebar
  const linkBaseStyle = "px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300";

  // Style Aktif (Indigo Glow)
  const activeStyle = "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-default pointer-events-none";

  // Style Normal
  const normalStyle = "text-gray-400 hover:text-white hover:bg-white/10";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Container Full Width dengan padding di pojok (px-6) */}
      <div className="w-full px-6 py-4 flex items-center justify-between">
        
        {/* POJOK KIRI: Brand/Logo */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></span>
          <h1 className="text-lg font-black text-white tracking-tighter uppercase">
            Monitoring <span className="text-indigo-400">IoT Device</span>
          </h1>
        </div>

        {/* POJOK KANAN: Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `${linkBaseStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Garis Pembatas jika ingin menambah tombol auth nantinya */}
          {user && <div className="w-[1px] h-5 bg-white/10 mx-2"></div>}
          
          <div className="flex gap-2">
            {/* Tempat LogoutButton / ChangePasswordButton */}
          </div>
        </div>

        {/* POJOK KANAN: Mobile Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-all text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (Full Width) */}
      {isOpen && (
        <div className="md:hidden w-full bg-gray-900/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl transition-all">
          <div className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `block py-4 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}