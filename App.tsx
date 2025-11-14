
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { SubmitButton } from './components/SubmitButton';
import { StatusAlert } from './components/StatusAlert';

const WEBHOOK_URL = 'https://n8n-wgkiddcb.us-east-1.clawcloudrun.com/webhook/hr-tuyendung';

type Status = {
  type: 'success' | 'error' | 'info';
  message: string;
} | null;

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prevFiles => {
        const existingFileNames = new Set(prevFiles.map(f => f.name));
        const uniqueNewFiles = newFiles.filter(f => !existingFileNames.has(f.name));
        return [...prevFiles, ...uniqueNewFiles];
      });
      // Reset input value to allow re-uploading the same file after removal
      event.target.value = ''; 
    }
  }, []);

  const handleRemoveFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  }, []);

  const handleSubmit = async () => {
    if (files.length === 0) {
      setStatus({ type: 'info', message: 'Vui lòng chọn ít nhất một file hồ sơ để gửi.' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.statusText}`);
      }
      
      setStatus({ type: 'success', message: 'Hồ sơ đã được gửi thành công!' });
      setFiles([]);
    } catch (error) {
      console.error('Lỗi khi gửi hồ sơ:', error);
      // FIX: The error "Property 'name' does not exist on type 'unknown'" likely originates from this catch block, as 'error' is of type 'unknown'. Type checking is required before accessing properties on it.
      const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định.';
      setStatus({ type: 'error', message: `Không thể gửi hồ sơ. Vui lòng thử lại. Lỗi: ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen flex flex-col items-center antialiased text-slate-800">
      <Header />
      <main className="w-full max-w-2xl mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-sky-800">Tải Lên Hồ Sơ Ứng Viên</h1>
            <p className="text-slate-500 mt-2">Vui lòng tải lên hồ sơ ứng viên dưới dạng file PDF.</p>
          </div>

          <FileUpload onFileChange={handleFileChange} />
          
          <FileList files={files} onRemoveFile={handleRemoveFile} />
          
          {status && <StatusAlert type={status.type} message={status.message} />}

          <SubmitButton
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={files.length === 0}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} NTCons. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
