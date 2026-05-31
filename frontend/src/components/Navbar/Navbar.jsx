import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

const Navbar = () => {
  const { unreadCount } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/demo" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 group-hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-240h72v-150l57 57 51-51-144-144-144 144 51 51 57-57v150ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"/></svg>
            </div>
            <span className="font-display text-xl font-700 text-livvic-900 ">
              <span className="text-blue-600">SWS AI Document Hub</span>
            </span>
          </Link>


          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width={22} height={22}>
                <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-fade-in shadow-lg shadow-blue-200">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            {showDropdown && (
              <NotificationDropdown onClose={() => setShowDropdown(false)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;