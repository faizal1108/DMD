import React from "react";
import FileUpload from "../components/FileUpload/FileUpload";
import DocumentTable from "../components/DocumentTable/DocumentTable";

const UploadPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-start gap-3 border border-blue-200 bg-blue-50 px-5 py-4 rounded-xl mb-6">
        <div className="flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 -960 960 960"
            fill="#2563eb"
          >
            <path d="M444-288h72v-240h-72v240Zm61.5-322.29q10.5-10.29 10.5-25.5t-10.29-25.71q-10.29-10.5-25.5-10.5t-25.71 10.29q-10.5 10.29-10.5 25.5t10.29 25.71q10.29 10.5 25.5 10.5t25.71-10.29ZM480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
          </svg>
        </div>
        <p className="text-[14px] leading-6 text-blue-700">
          <span className="font-semibold">Simulated demo</span>
          <span> — files are processed client-side only, nothing is stored. Upload </span>
          <span className="font-semibold">1–3 files</span>
          <span> to see individual per-file progress bars. Upload </span>
          <span className="font-semibold">4 or more files</span>
          <span> to trigger the bulk notification flow.</span>
        </p>
      </div>
      <FileUpload />
      <DocumentTable />
    </div>
  );
};

export default UploadPage;
