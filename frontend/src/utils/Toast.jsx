import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 1. Import createPortal

export default function Toast({ showToast, setShowToast, type, status, message }) {
  const [visible, setVisible] = useState(false);

  const styleToast = {
    success: "bg-green-500/10 border-green-500/50 text-green-400",
    error: "bg-red-500/10 border-red-500/50 text-red-400",
    info: "bg-blue-500/10 border-blue-500/50 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/50 text-yellow-400"
  };

  const icons = {
    success: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    error: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    default: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  };

  useEffect(() => {
    if (showToast) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setShowToast(prev => ({ ...prev, showToast: false }));
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast, setShowToast]);

  if (!showToast) return null;

  // 2. Gunakan createPortal untuk memindahkan DOM ke document.body
  return createPortal(
    <div className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-[9999] pointer-events-none">
      <div 
        className={`flex items-center gap-3 p-4 border rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out transform pointer-events-auto
          ${styleToast[type] || styleToast.success} 
          ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"}`}
      >
        <div className="flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[type] || icons.default}
          </svg>
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-0.5">
            {status || type}
          </p>
          <p className="text-sm font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <button 
          onClick={() => { 
            setVisible(false); 
            setTimeout(() => setShowToast(prev => ({ ...prev, showToast: false })), 300);
          }} 
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body // Target portal
  );
}