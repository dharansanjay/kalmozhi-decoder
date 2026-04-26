
import React, { useState } from 'react';

interface ApiKeySetupProps {
  onKeySubmit: (key: string) => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 ring-1 ring-slate-700">
        <h1 className="text-2xl font-bold text-center text-sky-400 mb-2">Welcome!</h1>
        <p className="text-center text-slate-400 mb-6">Please enter your Google Gemini API key to continue.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-2">
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              placeholder="Enter your API key"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-500 disabled:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
          >
            Start Converting
          </button>
        </form>
        <div className="text-center mt-6">
            <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-sky-400 transition-colors"
            >
                Don't have a key? Get one from Google AI Studio
            </a>
        </div>
      </div>
    </div>
  );
};
