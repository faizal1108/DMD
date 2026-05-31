import React, { useState, useRef, useCallback } from "react";
import { uploadFiles } from "../../services/api";
import { useDocuments } from "../../context/DocumentContext";
import UploadProgress from "../UploadProgress/UploadProgress";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const FileUpload = () => {
  const [dragging, setDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const { addDocuments } = useDocuments();

  const isBulk = uploadQueue.length > 3;

  const validateFiles = (files) => {
    const valid = [];
    const invalid = [];
    for (const f of files) {
      if (f.size > MAX_FILE_SIZE) invalid.push(`${f.name} exceeds 20 MB`);
      else valid.push(f);
    }
    if (invalid.length) setError(invalid.join(", "));
    else setError("");
    return valid;
  };

  const startUpload = useCallback(
    async (files) => {
      const valid = validateFiles(files);
      if (!valid.length) return;

      const queue = valid.map((f, i) => ({
        id: `${Date.now()}-${i}`,
        file: f,
        progress: 0,
        status: "pending",
      }));
      setUploadQueue(queue);

      // Mark all as uploading
      setUploadQueue((q) => q.map((item) => ({ ...item, status: "uploading" })));

      try {
        const formData = new FormData();
        valid.forEach((f) => formData.append("files", f));

        const res = await uploadFiles(formData, (event) => {
          const pct = Math.round((event.loaded / event.total) * 100);
          setUploadQueue((q) => q.map((item) => ({ ...item, progress: pct })));
        });

        setUploadQueue((q) => q.map((item) => ({ ...item, progress: 100, status: "completed" })));
        addDocuments(res.data.data);
      } catch (err) {
        setUploadQueue((q) => q.map((item) => ({ ...item, status: "failed" })));
        setError("Upload failed. Please try again.");
      }
    },
    [addDocuments]
  );

  const handleFiles = (files) => {
    const arr = Array.from(files);
    if (!arr.length) return;
    startUpload(arr);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="mt-2">
      <div
        onClick={openPicker}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
          dragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50"
        }`}
      >
        <div
          className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
            dragging ? "bg-blue-100 scale-110" : "bg-slate-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            width="36"
            viewBox="0 -960 960 960"
            fill={dragging ? "#2563eb" : "#94A3B8"}
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM200-120q-33 0-56.5-23.5T120-200v-120h80v120h560v-120h80v120q0 33-23.5 56.5T760-120H200Z" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 font-display">
          {dragging ? "Release to upload" : "Drop files here or click to browse"}
        </h2>
        <p className="mt-2 text-sm text-slate-400">Any file type · Up to 20 MB per file</p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center px-4">
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-600">
            Single file
          </span>
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-600">
            Bulk upload
          </span>
          <span className="rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-medium text-blue-700">
            Try 4+ files to trigger notifications
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 border border-red-100 animate-fade-in">
          <svg viewBox="0 -960 960 960" fill="#ef4444" width={16} height={16}>
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z" />
          </svg>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      
      <UploadProgress uploadQueue={uploadQueue} isBulk={isBulk} />
    </div>
  );
};

export default FileUpload;
