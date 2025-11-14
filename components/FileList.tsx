
import React from 'react';
import { FilePdfIcon } from './icons/FilePdfIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface FileListProps {
  files: File[];
  onRemoveFile: (fileName: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">File đã chọn:</h3>
        <ul className="divide-y divide-slate-200 rounded-md border border-slate-200">
        {files.map(file => (
            <li key={file.name} className="flex items-center justify-between p-3">
            <div className="flex items-center min-w-0">
                <FilePdfIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium text-slate-800 truncate" title={file.name}>
                {file.name}
                </span>
            </div>
            <button
                type="button"
                onClick={() => onRemoveFile(file.name)}
                className="ml-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                aria-label={`Xóa file ${file.name}`}
            >
                <XCircleIcon className="w-5 h-5" />
            </button>
            </li>
        ))}
        </ul>
    </div>
  );
};
