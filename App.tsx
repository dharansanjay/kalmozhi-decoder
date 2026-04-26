import React, { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { ImageUploader } from "./components/ImageUploader";
import { ResultDisplay } from "./components/ResultDisplay";
import { predictPeriod } from "./services/periodService";

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [convertedText, setConvertedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [predictedScript, setPredictedScript] = useState("");
  const [period, setPeriod] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setConvertedText("");
    setError(null);
    setPredictedScript("");
    setPeriod(null);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl(URL.createObjectURL(file));
  };

  const handleConvert = useCallback(async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // 🔥 Gemini translation
      const formData = new FormData();
formData.append("image", imageFile);

const res = await fetch("https://kalmozhi-decoder.onrender.com/predict", {
  method: "POST",
  body: formData
});

const data = await res.json();

setConvertedText(data.result);

    } catch (err) {
      if (err instanceof Error) {
        setError(`Conversion failed: ${err.message}`);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }

  }, [imageFile,]);

  return (
    <div
  className="
  min-h-screen flex flex-col text-slate-100 
  bg-cover bg-center bg-no-repeat bg-top md:bg-center
  bg-[url('/bg-mobile.jpg')] 
  md:bg-[url('/bg-desktop.jpg')]
  "
>
      <div className="min-h-screen bg-black/60 flex flex-col">

        <Header />

        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">

          <div className="
w-full max-w-5xl 
!bg-gray-800/80 
backdrop-blur-md 
rounded-2xl 
shadow-2xl 
p-6 md:p-8 
ring-1 ring-gray-600
">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* LEFT */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-yellow-400 mb-2">
                  Provide Image
                </h2>

                <ImageUploader
                  onImageSelect={handleImageSelect}
                  imageUrl={imageUrl}
                />
              </div>

              {/* RIGHT */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-yellow-400 mb-2">
                  Translation Output
                </h2>

                <ResultDisplay
                  text={convertedText}
                  isLoading={isLoading}
                  error={error}
                  period={period}
                />

                {/* ✅ SINGLE BOX UI */}
                {predictedScript && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl text-yellow-100 font-semibold space-y-2 shadow-lg">

                    <div>
                      📜 Predicted Script: {predictedScript}
                    </div>

                    {period && (
                      <div>
                        ⏳ Estimated Period: {period}
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-8 text-center">
              <button
                onClick={handleConvert}
                disabled={!imageFile || isLoading}
                className="relative inline-flex items-center justify-center px-8 py-4 
                font-bold text-lg rounded-xl 
                bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 
                text-black shadow-lg 
                transition-all duration-300 
                hover:scale-105 hover:shadow-yellow-500/50
                disabled:bg-slate-600 disabled:cursor-not-allowed overflow-hidden"
              >
                {isLoading ? "Analyzing..." : "🔍 Analyze & Decode"}
              </button>
            </div>

          </div>

          <footer className="text-center mt-8 text-slate-400 text-sm">
            Powered by DHARAN SANJAY
          </footer>

        </main>

      </div>
    </div>
  );
}

export default App;