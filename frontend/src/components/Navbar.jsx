import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard",  path: "/" },
    { name: "Device",     path: "/device" },
    { name: "My Account", path: "/account" },
  ];

  const linkBaseStyle =
    "px-3 py-2 rounded-md transition duration-200";

  const activeStyle =
    "bg-slate-900 text-white cursor-default pointer-events-none";

  const normalStyle =
    "hover:bg-slate-700 hover:text-sky-400";

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="w-full px-6 py-4 flex items-center">
        
        <h1 className="text-xl font-bold">
          Dashboard Monitoring
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 ml-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `${linkBaseStyle} ${
                  isActive ? activeStyle : normalStyle
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-700 px-6 pb-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `block py-2 px-2 rounded ${
                  isActive
                    ? "bg-slate-900 pointer-events-none"
                    : "hover:bg-slate-600"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}