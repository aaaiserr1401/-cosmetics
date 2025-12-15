import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from './Button';

interface PhotoUploadProps {
  onImageSelected: (file: File) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       const selectedFile = e.dataTransfer.files[0];
       setFile(selectedFile);
       setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-100/50 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Давайте посмотрим на вашу кожу</h2>
          <p className="text-slate-500 mt-2">Загрузите четкое селфи при естественном освещении для лучшего анализа.</p>
        </div>

        {!preview ? (
          <div 
            className="border-2 border-dashed border-rose-200 rounded-2xl p-10 transition-colors hover:bg-rose-50 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white shadow-sm rounded-full">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Загрузить файл</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Поддерживаются JPG, PNG (Макс. 5МБ)</p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden shadow-lg inline-block max-w-sm w-full">
             <img src={preview} alt="Preview" className="w-full h-auto object-cover" />
             <button 
               onClick={clearImage}
               className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-rose-500 hover:text-white transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
        )}

        <div className="mt-8">
           <Button 
             onClick={() => file && onImageSelected(file)} 
             disabled={!file}
             className="w-full sm:w-auto"
           >
             Анализировать кожу
           </Button>
        </div>
      </div>
    </div>
  );
};