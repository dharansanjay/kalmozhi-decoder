import React from "react";
import { ScrollIcon } from "./Icons";

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-10">

      {/* Icon */}
      <div className="inline-flex items-center justify-center bg-slate-800/70 backdrop-blur-md p-4 rounded-full mb-5 ring-1 ring-slate-600 shadow-lg">
        <ScrollIcon className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_10px_gold]" />
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl font-bold"
        style={{
          fontFamily: "Cinzel, serif",
          letterSpacing: "3px",
          color: "#d4af37",
          textShadow: "2px 2px 12px rgba(0,0,0,0.9)"
        }}
      >
        Kalmozhi Decoder
      </h1>

      {/* Subtitle */}
      <p
        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-300"
        style={{ fontFamily: "serif" }}
      >
        Analysis and Translation of Ancient Tamil Inscriptions.
      </p>

    </header>
  );
};