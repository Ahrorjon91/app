import React from 'react';

/**
 * Apple Midnight Endurance Stage Background
 * Built per DESIGN.md: Pure Carbon #111111 canvas with subtle vignette depth
 * and zero garish neon gradients or rainbow pulses.
 */
export const CyberBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#000000]"
      style={{ contain: 'strict' }}
    >
      {/* Subtle depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.6) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
};
