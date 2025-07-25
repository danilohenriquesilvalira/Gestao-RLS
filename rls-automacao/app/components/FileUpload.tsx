// components/FileUpload.tsx
import { useState, useRef } from 'react';
import { api } from '@/lib/api';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  onUpload: (fileId: number) => void;
  accept?: string;
  maxSize?: number; // MB
  preview?: boolean;
}

export default function FileUpload({ 
  onUpload, 
  accept = "image/*,.pdf", 
  maxSize = 5,
  preview = true 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validações
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo ${maxSize}MB.`);
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      const uploadedFile = await api.uploadFile(file);
      setUploadedFile(uploadedFile);
      onUpload(uploadedFile.id);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (uploadedFile && preview) {
    return (
      <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {uploadedFile.mime.startsWith('image/') ? (
              <Image className="w-5 h-5 text-green-600" />
            ) : (
              <FileText className="w-5 h-5 text-green-600" />
            )}
            <span className="text-sm font-medium text-green-800">
              {uploadedFile.name}
            </span>
          </div>
          <button
            onClick={clearFile}
            className="text-green-600 hover:text-green-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="text-green-600">
            <Upload className="w-8 h-8 mx-auto mb-2 animate-bounce" />
            <p>Enviando arquivo...</p>
          </div>
        ) : (
          <div className="text-gray-500">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <p>Clique para selecionar arquivo</p>
            <p className="text-xs">Máximo {maxSize}MB</p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}

// Hook para facilitar uso
export function useFileUpload() {
  const [fileId, setFileId] = useState<number | null>(null);
  
  const handleUpload = (id: number) => setFileId(id);
  const clearFile = () => setFileId(null);
  
  return { fileId, handleUpload, clearFile };
}