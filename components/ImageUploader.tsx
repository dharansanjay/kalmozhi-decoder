import React, { useRef, useState, useCallback } from "react";
import { UploadIcon, CameraIcon } from "./Icons";
import { CameraCapture } from "./CameraCapture";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  imageUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // ✅ FIXED function name
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        onImageSelect(event.dataTransfer.files[0]);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCapture = (file: File) => {
    onImageSelect(file);
    setIsCameraOpen(false);
  };
  

  return (
    <div className="flex flex-col w-full h-full">
      
      {/* Upload Box */}
      <div
  onClick={handleClick}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  className="cursor-pointer h-full min-h-[300px] 
  bg-slate-900/70 rounded-lg 
  border border-slate-700 
  flex flex-col items-center justify-center 
  hover:border-yellow-500 transition"
>
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />

  {imageUrl ? (
    <img
      src={imageUrl}
      alt="Uploaded"
      className="max-h-full rounded"
    />
  ) : (
    <>
      <UploadIcon className="h-10 w-10 text-yellow-400" />

      <p className="mt-3 text-yellow-400 font-semibold">
        Click to upload
      </p>

      <p className="text-sm text-slate-400">
        PNG, JPG, or WEBP
      </p>
    </>
  )}
</div>

      {/* Camera Button */}
      <button
        onClick={() => setIsCameraOpen(true)}
        className="mt-4 w-full flex items-center justify-center 
        px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
      >
        <CameraIcon className="mr-2 h-5 w-5" />
        Use Camera
      </button>

      {/* Camera */}
      {isCameraOpen && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </div>
  );
};