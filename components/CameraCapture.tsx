import React, { useState, useRef, useEffect } from 'react';
import { CameraIcon } from './Icons';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera access was denied. Please enable camera permissions in your browser settings.");
      }
    };
    
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-shot.png", { type: "image/png" });
            onCapture(file);
          }
        }, 'image/png');
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
      <div className="relative w-full max-w-4xl p-4">
        {error ? (
          <div className="text-center text-white bg-red-500/50 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Error</h3>
            <p>{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto rounded-lg"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex items-center space-x-4 mt-4">
         <button
            onClick={handleCapture}
            disabled={!!error}
            className="group p-4 rounded-full bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed transition-all"
            aria-label="Take Photo"
        >
            <div className="p-3 rounded-full bg-white group-disabled:bg-slate-400">
                <CameraIcon className="h-8 w-8 text-slate-800" />
            </div>
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};