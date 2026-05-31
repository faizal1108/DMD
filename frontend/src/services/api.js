import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const fetchDocuments = () => api.get("/documents");

export const uploadFiles = (formData, onUploadProgress) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });

export const downloadDocument = (id) =>
  api.get(`/documents/${id}/download`, { responseType: "blob" });

export const deleteDocument = (id) => api.delete(`/documents/${id}`);

export const fetchNotifications = () => api.get("/notifications");

export const markNotificationRead = (id) =>
  api.patch(`/notifications/${id}/read`);

export const markAllNotificationsRead = () =>
  api.patch("/notifications/read-all");

export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

export default api;
