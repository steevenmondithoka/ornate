import React from 'react';

export const BackgroundDesign = () => {
  // Direct link to the GIF
  const gifUrl = "https://images.squarespace-cdn.com/content/v1/6021b3cd6194085b4766726d/1617862441738-NSFCJ5YRJ2I7HW2R0MSU/bkgd.gif";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* 1. THE MAIN GIF - Increased Opacity and Brightness */}
      <img 
        src={gifUrl}
        alt="Background"
        referrerPolicy="no-referrer" // Critical: This helps bypass Pinterest blocks
        className="absolute inset-0 w-full h-full object-cover opacity-60 contrast-125 brightness-75 transition-opacity duration-1000"
      />

      {/* 2. THE VIOLET OVERLAY - Subtle tint */}
      <div className="absolute inset-0 bg-violet-950/30 mix-blend-screen" />

      {/* 3. LIGHT VIGNETTE - Only darkens the very edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,20,0.8)_100%)]" />

      {/* 4. SCANLINE TEXTURE - Very faint to keep it clean */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
    </div>
  );
};

export default BackgroundDesign;