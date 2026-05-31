import React from "react";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const FileProgressItem = ({ file, progress, status }) => {
  const ext = file.name.split(".").pop().toUpperCase();

  const statusColors = {
    uploading: "text-blue-600",
    completed: "text-emerald-600",
    failed: "text-red-500",
    pending: "text-slate-400",
  };

  const barColor = {
    uploading: "shimmer",
    completed: "bg-emerald-500",
    failed: "bg-red-400",
    pending: "bg-slate-200",
  };

  return (
    <div className="flex items-center gap-3 py-2.5 animate-fade-in">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
        <span className="text-[9px] font-bold text-blue-600 font-mono">{ext.slice(0, 4)}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-slate-700 truncate pr-2">{file.name}</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400">{formatSize(file.size)}</span>
            <span className={`text-xs font-semibold ${statusColors[status]}`}>
              {status === "uploading" ? `${progress}%` : status}
            </span>
          </div>
        </div>

        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor[status]}`}
            style={{ width: `${status === "completed" ? 100 : status === "failed" ? 100 : progress}%` }}
          />
        </div>
      </div>

      <div className="flex-shrink-0">
        {status === "completed" && (
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg viewBox="0 -960 960 960" fill="#10b981" width={14} height={14}>
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </div>
        )}
        {status === "failed" && (
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg viewBox="0 -960 960 960" fill="#ef4444" width={14} height={14}>
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        )}
        {status === "uploading" && (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

const BulkUploadBanner = ({ fileCount, progress, completed }) => {
  return (
    <div className="rounded-xl bg-blue-600 text-white p-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          {completed ? (
            <svg viewBox="0 -960 960 960" fill="white" width={20} height={20}>
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">
            {completed
              ? `${fileCount} files uploaded successfully`
              : `Upload in progress — processing ${fileCount} files in background`}
          </p>
          <p className="text-blue-200 text-xs mt-0.5">
            {completed ? "All files are now available in your library" : "Files are being processed..."}
          </p>
        </div>
        <span className="text-white font-bold text-sm tabular-nums">{progress}%</span>
      </div>
      {!completed && (
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

const UploadProgress = ({ uploadQueue, isBulk }) => {
  if (!uploadQueue || uploadQueue.length === 0) return null;

  const overallProgress = Math.round(
    uploadQueue.reduce((acc, f) => acc + f.progress, 0) / uploadQueue.length
  );
  const allDone = uploadQueue.every((f) => f.status === "completed" || f.status === "failed");

  return (
    <div className="mt-5 space-y-2">
      {isBulk ? (
        <BulkUploadBanner
          fileCount={uploadQueue.length}
          progress={overallProgress}
          completed={allDone}
        />
      ) : (
        <div className="card p-4 divide-y divide-slate-50">
          {uploadQueue.map((item) => (
            <FileProgressItem
              key={item.id}
              file={item.file}
              progress={item.progress}
              status={item.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
