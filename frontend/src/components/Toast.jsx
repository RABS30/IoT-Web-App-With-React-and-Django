import { useEffect, useState } from "react";

export default function Toast({ showToast, setShowToast, type, status, message }) {

  const [visible, setVisible] = useState(false);

  const styleToast = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    info: "bg-blue-100 border-blue-300 text-blue-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800"
  };

  useEffect(() => {

    if (showToast) {

      // animasi masuk
      setVisible(true);

      const timer = setTimeout(() => {

        // animasi keluar
        setVisible(false);

        setTimeout(() => {
          setShowToast(prev => ({
            ...prev, showToast: false
          }));
        }, 300);

      }, 1000);

      return () => clearTimeout(timer);
    }

  }, [showToast, setShowToast]);

  if (!showToast) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className={`flex items-start gap-3 p-4 border rounded-lg shadow-xl backdrop-blur-md text-sm transition-all duration-300 transform ${styleToast[type] || styleToast.success} ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        
        {/* Icon */}
        <svg className="w-4 h-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>

        {/* Text */}
        <p className="flex-1">
          <span className="font-medium mr-1">
            {status}
          </span>
            {message}
        </p>

        {/* Close Button */}
        <button onClick={() => { setVisible(false); setTimeout(() => setShowToast(prev => ({
          ...prev, showToast: false
        })), 300);}} className="hover:opacity-60">
          ✕
        </button>

      </div>

    </div>
  );
}