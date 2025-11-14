
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  return (
    <div>
      <label
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-sky-300 border-dashed rounded-lg cursor-pointer bg-sky-50 hover:bg-sky-100 transition-colors duration-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-3 text-sky-500" />
          <p className="mb-2 text-sm text-slate-500">
            <span className="font-semibold text-sky-600">Nhấp để tải lên</span> hoặc kéo và thả
          </p>
          <p className="text-xs text-slate-400">Chỉ chấp nhận file PDF</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          accept=".pdf"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
};
