import React from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

const typeIcon = (type) => {
  const icons = {
    success: (
      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 -960 960 960" fill="#10b981" width={16} height={16}>
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </div>
    ),
    error: (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 -960 960 960" fill="#ef4444" width={16} height={16}>
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z" />
        </svg>
      </div>
    ),
    info: (
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 -960 960 960" fill="#3b82f6" width={16} height={16}>
          <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Z" />
        </svg>
      </div>
    ),
  };
  return icons[type] || icons.info;
};

const formatTime = (ts) => {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
};

const NotificationDropdown = ({ onClose }) => {
  const { notifications, unreadCount, markRead, markAllRead, loading } = useNotifications();

  const recent = notifications.slice(0, 8);

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-xl border border-slate-100 animate-slide-down overflow-hidden z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-800">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!loading && recent.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-slate-400">
            <svg viewBox="0 -960 960 960" fill="currentColor" width={32} height={32}>
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Z" />
            </svg>
            <p className="text-sm">No notifications yet</p>
          </div>
        )}
        {recent.map((notif) => (
          <div
            key={notif._id}
            className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
              !notif.read ? "bg-blue-50/40" : ""
            }`}
            onClick={() => !notif.read && markRead(notif._id)}
          >
            {typeIcon(notif.type)}
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${!notif.read ? "font-medium text-slate-800" : "text-slate-600"}`}>
                {notif.message}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{formatTime(notif.timestamp)}</p>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 px-4 py-2.5">
        <Link
          to="/demo/notifications"
          onClick={onClose}
          className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View all notifications →
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;