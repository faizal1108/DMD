import React from "react";
import { useNotifications } from "../context/NotificationContext";

const formatDate = (ts) => {
  const d = new Date(ts);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const typeConfig = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    icon: "bg-emerald-100",
    fill: "#10b981",
    path: "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z",
    label: "text-emerald-700",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-100",
    icon: "bg-red-100",
    fill: "#ef4444",
    path: "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z",
    label: "text-red-600",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "bg-blue-100",
    fill: "#3b82f6",
    path: "M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Z",
    label: "text-blue-600",
  },
};

const NotificationCard = ({ notif, onMarkRead, onDelete }) => {
  const cfg = typeConfig[notif.type] || typeConfig.info;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 animate-fade-in ${
        !notif.read ? `${cfg.bg} ${cfg.border}` : "bg-white border-slate-100"
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 ${cfg.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <svg viewBox="0 -960 960 960" fill={cfg.fill} width={20} height={20}>
          <path d={cfg.path} />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${!notif.read ? "font-semibold text-slate-800" : "text-slate-600"}`}>
          {notif.message}
        </p>
        <p className="text-xs text-slate-400 mt-1 font-mono">{formatDate(notif.timestamp)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {!notif.read && (
          <button
            onClick={() => onMarkRead(notif._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-all"
            title="Mark as read"
          >
            <svg viewBox="0 -960 960 960" fill="currentColor" width={16} height={16}>
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(notif._id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Delete"
        >
          <svg viewBox="0 -960 960 960" fill="currentColor" width={16} height={16}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>

      {/* Unread dot */}
      {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />}
    </div>
  );
};

const NotificationsPage = () => {
  const { notifications, unreadCount, loading, markRead, markAllRead, removeNotification } =
    useNotifications();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-primary text-sm">
            Mark all as read
          </button>
        )}
      </div>

      {/* Stats bar */}
      {notifications.length > 0 && (
        <div className="flex gap-3 mb-6">
          <div className="card px-4 py-3 flex-1 text-center">
            <p className="text-2xl font-bold text-slate-800 font-display">{notifications.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">Total</p>
          </div>
          <div className="card px-4 py-3 flex-1 text-center">
            <p className="text-2xl font-bold text-blue-600 font-display">{unreadCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Unread</p>
          </div>
          <div className="card px-4 py-3 flex-1 text-center">
            <p className="text-2xl font-bold text-emerald-600 font-display">
              {notifications.filter((n) => n.read).length}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Read</p>
          </div>
        </div>
      )}

      {/* Notification List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center">
            <svg viewBox="0 -960 960 960" fill="currentColor" width={40} height={40}>
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-500 text-lg">No notifications yet</p>
            <p className="text-sm mt-1">Upload files to see activity here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <NotificationCard
              key={notif._id}
              notif={notif}
              onMarkRead={markRead}
              onDelete={removeNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
