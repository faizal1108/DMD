import React from "react";

const FileUpload = () => {
  return (
    <div className="mt-4">
      <label
        htmlFor="file-upload"
        className="flex h-[340px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="42"
            width="42"
            viewBox="0 -960 960 960"
            fill="#94A3B8"
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM200-120q-33 0-56.5-23.5T120-200v-120h80v120h560v-120h80v120q0 33-23.5 56.5T760-120H200Z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800">
          Drop files here or click to browse
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Any file type · Up to 20 MB per file
        </p>

        <div className="mt-8 flex gap-3">
          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
            Single file
          </span>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
            Bulk upload
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Try 4+ files to trigger notifications
          </span>
        </div>

        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUpload;