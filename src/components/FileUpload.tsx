import React, { useRef, useState } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import { parseDocument } from '../utils/documentParser';

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onTextExtracted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      const text = await parseDocument(file);
      onTextExtracted(text);
    } catch (err) {
      setError('Failed to read file. Please try again or paste the text manually.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 transition-colors
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
          disabled={loading}
        />
        
        <div className="flex flex-col items-center justify-center gap-2">
          {loading ? (
            <>
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500 animate-bounce" />
              <p className="text-sm text-gray-600">Processing file...</p>
            </>
          ) : (
            <>
              <File className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />
              <p className="text-sm text-gray-600">
                Drop your resume file here or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, Word (docx), and Text files
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;