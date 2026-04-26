import React, { useState, useEffect } from "react";
import { CopyIcon, CheckIcon } from "./Icons";
import { Loader } from "./Loader";

interface ResultDisplayProps {
  text?: string;
  isLoading: boolean;
  error: string | null;
   period?: string | null; 
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  text,
  isLoading,
  error,
}) => {
  const safeText = text || "";
  const [isCopied, setIsCopied] = useState(false);

  // 🔥 Split Tamil & English
  const tamilMatch = safeText.match(/Modern Tamil:\s*([\s\S]*?)English Translation:/);
const englishMatch = safeText.match(/English Translation:\s*([\s\S]*)/);

const modernTamil = tamilMatch ? tamilMatch[1].trim() : "No Tamil output";
const english = englishMatch ? englishMatch[1].trim() : "No English output";

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (safeText.length > 0) {
      navigator.clipboard.writeText(safeText);
      setIsCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Loader />
          <p className="mt-4 text-lg">Converting script...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
          <p>{error}</p>
        </div>
      );
    }

    if (text) {
      return (
        <div className="relative h-full">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <CopyIcon className="h-5 w-5" />
            )}
          </button>

          {/* 🔥 Split UI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-4">

            {/* Tamil Output */}
            <div className="bg-slate-900/70 p-4 rounded-lg overflow-auto">
              <h3 className="text-green-400 font-bold mb-2">
                Modern Tamil
              </h3>
              <pre className="whitespace-pre-wrap text-slate-200">
                {modernTamil || "Tamil text will appear here"}
              </pre>
            </div>

            {/* English Output */}
            <div className="bg-slate-900/70 p-4 rounded-lg overflow-auto">
              <h3 className="text-blue-400 font-bold mb-2">
                English Translation
              </h3>
              <pre className="whitespace-pre-wrap text-slate-200">
                {english || "English translation will appear here"}
              </pre>
            </div>

          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-center text-slate-500 p-4">
        <p>Translation will appear here after conversion.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">

      <div className="flex-grow w-full h-96 
bg-[#140f0a]/80 
rounded-xl 
border border-yellow-800/30 
shadow-[0_0_25px_rgba(255,215,0,0.1)] 
backdrop-blur-lg">
  {renderContent()}
</div>
    </div>
  );
};
