import React, { useEffect } from "react";
import { useDocuments } from "../../context/DocumentContext";
import { downloadDocument, deleteDocument as deleteDocApi } from "../../services/api";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDate = (d) => {
  const date = new Date(d);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const FileTypeIcon = ({ type }) => {
  const color =
    type?.includes("pdf")
      ? "#ef4444"
      : type?.includes("image")
      ? "#8b5cf6"
      : type?.includes("video")
      ? "#f59e0b"
      : "#3b82f6";

  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: color + "15" }}
    >
      <svg viewBox="0 -960 960 960" fill={color} width={16} height={16}>
        <path d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
      </svg>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    uploading: "bg-blue-50 text-blue-700 border-blue-100",
    failed: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        styles[status] || styles.completed
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "completed"
            ? "bg-emerald-500"
            : status === "uploading"
            ? "bg-blue-500 animate-pulse"
            : "bg-red-400"
        }`}
      />
      {status}
    </span>
  );
};

const DocumentTable = () => {
  const { documents, loading, loadDocuments, removeDocument } = useDocuments();

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleDownload = async (doc) => {
    try {
      const res = await downloadDocument(doc._id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this document?")) return;
    try {
      await deleteDocApi(id);
      removeDocument(id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-lg font-semibold text-slate-800">Document Library</h2>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {documents.length} {documents.length === 1 ? "document" : "documents"}
          </span>
        </div>
        <button
          onClick={loadDocuments}
          className="btn-ghost text-xs flex items-center gap-1.5"
          title="Refresh"
        >
          <svg viewBox="0 -960 960 960" fill="currentColor" width={14} height={14}>
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 91-106 148.5T480-160Z" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 -960 960 960" fill="currentColor" width={32} height={32}>
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-500">No documents yet</p>
              <p className="text-sm mt-1">Upload files above to see them here</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Uploaded At
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {documents.map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-slate-50/70 transition-colors group animate-fade-in"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <FileTypeIcon type={doc.fileType} />
                        <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                          {doc.originalName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {formatSize(doc.size)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-400 hidden md:table-cell font-mono">
                      {formatDate(doc.uploadDate)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          title="Download"
                        >
                          <svg viewBox="0 -960 960 960" fill="currentColor" width={16} height={16}>
                            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM200-120q-33 0-56.5-23.5T120-200v-120h80v120h560v-120h80v120q0 33-23.5 56.5T760-120H200Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <svg viewBox="0 -960 960 960" fill="currentColor" width={16} height={16}>
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentTable;
